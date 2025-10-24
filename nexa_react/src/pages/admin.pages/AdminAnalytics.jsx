import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import {
  getAnalyticsSummary,
  getQuizAttempts, 
  getDonations, 
  getCourses,
  downloadQuizAttemptsPDF, 
  downloadDonationsPDF, 
  downloadCoursesPDF
} from "../../apis/admin.apis/admin.analytics.api";
import { downloadBlob } from "../../tools/admin.tools/downloadBlob.js";
import "../../assets/admin.assets/admin.analytics.css";

// Analytics Card Component
const AnalyticsCard = ({ title, value, sub, iconType }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'courses':
        return '📚';
      case 'donations':
        return '💰';
      case 'quizzes':
        return '📝';
      case 'learning':
        return '🎯';
      default:
        return '📊';
    }
  };

  return (
    <div className="analytics-stat-card">
      <div className="analytics-stat-icon-wrapper">
        <div className={`analytics-stat-icon ${iconType}`}>
          {getIcon(iconType)}
        </div>
      </div>
      <div className="analytics-stat-content">
        <div className="analytics-stat-value">{value}</div>
        <div className="analytics-stat-label">{title}</div>
        {sub && <div className="analytics-stat-sub">{sub}</div>}
      </div>
    </div>
  );
};

// Analytics Section Component
const AnalyticsSection = ({ title, actions, children }) => (
  <div className="analytics-data-section">
    <div className="analytics-section-header">
      <h3 className="analytics-section-title">{title}</h3>
      <div className="analytics-section-actions">{actions}</div>
    </div>
    {children}
  </div>
);

// Analytics Table Component
const AnalyticsTable = ({ columns, rows, keyField = "_id" }) => (
  <div className="analytics-table-container">
    <table className="analytics-data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[keyField]}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(row) : String(row[col.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={columns.length} className="analytics-table-empty">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default function AdminAnalytics() {
  const [summary, setSummary] = useState(null);
  const [quiz, setQuiz] = useState({ rows: [], total: 0 });
  const [donations, setDonations] = useState({ rows: [], total: 0, totalAmount: 0 });
  const [courses, setCourses] = useState({ rows: [], total: 0, publishedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load all analytics data
  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [summaryData, quizData, donationsData, coursesData] = await Promise.all([
        getAnalyticsSummary(),
        getQuizAttempts({ limit: 20 }),
        getDonations({ limit: 20 }),
        getCourses({ limit: 20 }),
      ]);
      
      setSummary(summaryData);
      setQuiz(quizData);
      setDonations(donationsData);
      setCourses(coursesData);
    } catch (err) {
      console.error("Error loading analytics:", err);
      setError("Failed to load analytics data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  // Handle PDF download
  const handleDownloadPDF = async (type) => {
    try {
      let blob;
      let filename;

      switch (type) {
        case 'quiz':
          blob = await downloadQuizAttemptsPDF();
          filename = 'quiz_attempts_report.pdf';
          break;
        case 'donations':
          blob = await downloadDonationsPDF();
          filename = 'donations_report.pdf';
          break;
        case 'courses':
          blob = await downloadCoursesPDF();
          filename = 'courses_report.pdf';
          break;
        default:
          return;
      }

      downloadBlob(blob, filename);
    } catch (err) {
      console.error(`Error downloading ${type} PDF:`, err);
      setError(`Failed to download ${type} report. Please try again.`);
    }
  };

  // Get current date for display
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Table column definitions with proper name fields
  const quizColumns = [
    { 
      key: "studentName", 
      label: "Student Name", 
      render: (row) => row.studentName || "Unknown Student"
    },
    { 
      key: "courseName", 
      label: "Course Name", 
      render: (row) => row.courseName || "Unknown Course"
    },
    { 
      key: "totalScore", 
      label: "Score", 
      render: (row) => `${row.totalScore}/${row.maxScore}` 
    },
    { 
      key: "percentage", 
      label: "Percentage", 
      render: (row) => `${row.percentage}%` 
    },
    { 
      key: "passed", 
      label: "Status", 
      render: (row) => (
        <span className={`analytics-status-badge ${row.passed ? 'passed' : 'failed'}`}>
          {row.passed ? 'Passed' : 'Failed'}
        </span>
      ) 
    },
    { 
      key: "timeSpent", 
      label: "Time Spent", 
      render: (row) => `${row.timeSpent}s` 
    },
    {
      key: "completedAt",
      label: "Completed At",
      render: (row) => row.completedAt ? new Date(row.completedAt).toLocaleDateString() : "N/A"
    },
  ];

  const donationsColumns = [
    {
      key: "donorName",
      label: "Donor Name",
      render: (row) => row.donorName || "Anonymous"
    },
    { 
      key: "donorEmail", 
      label: "Email", 
      render: (row) => row.donorEmail || "—" 
    },
    { 
      key: "amount", 
      label: "Amount", 
      render: (row) => `$${row.amount?.toFixed(2) || '0.00'}` 
    },
    { 
      key: "currency", 
      label: "Currency" 
    },
    { 
      key: "paymentMethod", 
      label: "Payment Method" 
    },
    { 
      key: "status", 
      label: "Status",
      render: (row) => (
        <span className={`analytics-status-badge ${row.status}`}>
          {row.status}
        </span>
      )
    },
    {
      key: "createdAt",
      label: "Donation Date",
      render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"
    },
  ];

  const coursesColumns = [
    { 
      key: "title", 
      label: "Course Title" 
    },
    { 
      key: "tutorName", 
      label: "Tutor Name", 
      render: (row) => row.tutorName || "Unknown Tutor"
    },
    { 
      key: "category", 
      label: "Category" 
    },
    { 
      key: "status", 
      label: "Status",
      render: (row) => (
        <span className={`analytics-status-badge ${row.status}`}>
          {row.status}
        </span>
      )
    },
    { 
      key: "isActive", 
      label: "Active", 
      render: (row) => row.isActive ? "Yes" : "No" 
    },
    {
      key: "enrollmentCount",
      label: "Enrollments",
      render: (row) => row.enrollmentCount || 0
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString()
    },
  ];

  return (
    <div className="admin-analytics-layout">
      <AdminSidebar />
      <div className="admin-analytics-main">
        <AdminHeader />
        
        <div className="admin-analytics-content">
          {/* Page Header */}
          <div className="analytics-page-header">
            <div className="analytics-header-content">
              <h1 className="analytics-page-title">Reports & Analytics</h1>
              <p className="analytics-page-subtitle">
                Comprehensive overview of platform performance and user engagement
              </p>
            </div>
            <div className="analytics-header-actions">
              <div className="analytics-date-display">
                {getCurrentDate()}
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="analytics-error-state">
              <span>{error}</span>
              <button 
                className="analytics-retry-btn"
                onClick={loadAnalyticsData}
              >
                Retry
              </button>
            </div>
          )}

          {/* Summary Cards */}
          {summary && (
            <div className="analytics-cards-grid">
              <AnalyticsCard
                title="Total Courses"
                value={summary.courses?.total || 0}
                sub={`Published: ${summary.courses?.published || 0}`}
                iconType="courses"
              />
              <AnalyticsCard
                title="Total Donations"
                value={`$${summary.donations?.totalAmount?.toFixed(2) || '0.00'}`}
                sub={`Count: ${summary.donations?.count || 0}`}
                iconType="donations"
              />
              <AnalyticsCard
                title="Quiz Attempts"
                value={summary.quizzes?.attempts || 0}
                sub={`Pass Rate: ${((summary.quizzes?.passRate || 0) * 100).toFixed(1)}%`}
                iconType="quizzes"
              />
              <AnalyticsCard
                title="Average Quiz Score"
                value={`${(summary.quizzes?.avgPercentage || 0).toFixed(1)}%`}
                sub={`Completed Lessons: ${summary.learning?.totalCompletedLessons || 0}`}
                iconType="learning"
              />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="analytics-loading-state">
              Loading analytics data...
            </div>
          )}

          {/* Data Sections */}
          {!loading && (
            <>
              {/* Quiz Attempts Section */}
              <AnalyticsSection
                title={`Quiz Attempts Analytics (${quiz.total || 0})`}
                actions={
                  <>
                    <button
                      className="analytics-btn analytics-btn-primary"
                      onClick={() => handleDownloadPDF('quiz')}
                    >
                      Download PDF
                    </button>
                    <button 
                      className="analytics-btn" 
                      onClick={loadAnalyticsData}
                    >
                      Refresh
                    </button>
                  </>
                }
              >
                <AnalyticsTable columns={quizColumns} rows={quiz.rows || []} />
              </AnalyticsSection>

              {/* Donations Section */}
              <AnalyticsSection
                title={`Donations Analytics (${donations.total || 0}) • Total: $${(donations.totalAmount || 0).toFixed(2)}`}
                actions={
                  <>
                    <button
                      className="analytics-btn analytics-btn-primary"
                      onClick={() => handleDownloadPDF('donations')}
                    >
                      Download PDF
                    </button>
                    <button 
                      className="analytics-btn" 
                      onClick={loadAnalyticsData}
                    >
                      Refresh
                    </button>
                  </>
                }
              >
                <AnalyticsTable columns={donationsColumns} rows={donations.rows || []} />
              </AnalyticsSection>

              {/* Courses Section */}
              <AnalyticsSection
                title={`Courses Analytics (${courses.total || 0}) • Published: ${courses.publishedCount || 0}`}
                actions={
                  <>
                    <button
                      className="analytics-btn analytics-btn-primary"
                      onClick={() => handleDownloadPDF('courses')}
                    >
                      Download PDF
                    </button>
                    <button 
                      className="analytics-btn" 
                      onClick={loadAnalyticsData}
                    >
                      Refresh
                    </button>
                  </>
                }
              >
                <AnalyticsTable columns={coursesColumns} rows={courses.rows || []} />
              </AnalyticsSection>
            </>
          )}
        </div>
      </div>
    </div>
  );
}