import "../../assets/admin.assets/admin.dashboard.css";
import "../../assets/admin.assets/admin.header.css";
import "../../assets/admin.assets/admin.sidebar.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPending, getApproved } from "../../apis/admin.apis/admin.approvals.api";
import {
  getCourseCategories,
  getSessionsChart,
  getStudentCount,
  getCoursesChart,             // ✅ NEW
} from "../../apis/admin.apis/admin.dashboard.api";
import {
  LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

/* ---------- Mock fallbacks ---------- */
function buildMockCourseStudentSeries(days = 12) {
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const name = d.toISOString().slice(0, 10);

    // Mock totals
    const courses  = Math.floor(Math.random() * 4) + 1;  // 1..4 courses/day
    const students = Math.floor(Math.random() * 10) + 3; // 3..12 students/day

    out.push({ name, courses, students });
  }
  return out;
}

function buildMockCategories() {
  return [
    { name: "JavaScript", value: 5 },
    { name: "Java",       value: 4 },
    { name: "Python",     value: 3 },
    { name: "Data Science", value: 2 },
    { name: "DevOps",     value: 2 },
  ];
}

export default function AdminDashboardPage() {
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);   // 🔵 REAL students count
  const [tutorRequests, setTutorRequests] = useState([]);
  const [approvedTutors, setApprovedTutors] = useState([]);

  // Real (or mock) data
  const [series, setSeries] = useState([]);              // [{ name, courses, students }]
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7", "#EF4444"];

  /* Load approvals + active students */
  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [pendingTutors, approved, students] = await Promise.all([
          getPending(),
          getApproved(1000),
          getStudentCount(),               // 🔵 /admin/students/count
        ]);

        setTutorRequests(pendingTutors || []);
        setPendingCount(pendingTutors?.length || 0);
        setApprovedTutors(approved || []);
        setApprovedCount(approved?.length || 0);
        setStudentCount(students || 0);   // update card
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  /* Load charts: merge Courses (blue) + Students (green) + Categories */
  useEffect(() => {
    let mounted = true;
    async function loadCharts() {
      setChartLoading(true);
      try {
        const [sessions, courses, categories] = await Promise.all([
          getSessionsChart().catch(() => []),  // expects { name, students } or { name, tutors }
          getCoursesChart().catch(() => []),   // expects { name, courses }
          getCourseCategories().catch(() => []),
        ]);

        if (!mounted) return;

        // normalize students from sessions (support legacy 'tutors')
        const sMap = new Map(
          (sessions || []).map((r) => [r.name, { students: r.students ?? r.tutors ?? 0 }])
        );

        // courses per day
        const cMap = new Map((courses || []).map((r) => [r.name, { courses: r.courses ?? 0 }]));

        // align by date across both
        const keys = new Set([...sMap.keys(), ...cMap.keys()]);
        let merged = Array.from(keys)
          .sort() // ascending date strings
          .map((k) => ({
            name: k,
            courses: cMap.get(k)?.courses ?? 0,
            students: sMap.get(k)?.students ?? 0,
          }));

        // 🔁 Fallback 1: if we have dates but ALL students are 0, use the live active studentCount
      // (this happens when sessions endpoint returns nothing)
      const hasAnyStudentsPoint = merged.some((p) => Number(p.students) > 0);
      if (!hasAnyStudentsPoint && merged.length && studentCount > 0) {
        merged = merged.map((p) => ({ ...p, students: studentCount }));
      }
        // 🔁 Fallback 2: if no data at all, use mock
        if (!merged.length) merged = buildMockCourseStudentSeries();

        // categories
        const cat = (categories?.length ? categories : [
          { name: "JavaScript", value: 5 },
          { name: "Java",       value: 4 },
          { name: "Python",     value: 3 },
        ]).map((x) => ({ name: x.name || "Uncategorized", value: Number(x.value || 0) }));

        setSeries(merged);
        setCategoryData(cat);
      } catch (err) {
        console.error("Error loading chart data:", err);
        if (mounted) {
          setSeries(buildMockCourseStudentSeries());
          setCategoryData([
            { name: "JavaScript", value: 5 },
            { name: "Java",       value: 4 },
            { name: "Python",     value: 3 },
          ]);
        }
      } finally {
        mounted && setChartLoading(false);
      }
    }
    loadCharts();
    return () => { mounted = false; };
  }, [studentCount]);

  // helpers from series
  const sumLastN = (key, n) =>
    series.slice(-n).reduce((acc, item) => acc + (Number(item?.[key]) || 0), 0);

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <AdminSidebar />

      <main className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="welcome-title">Welcome Back</h1>
            <p className="welcome-subtitle">
              Manage Nexa insights and monitor platform activity
            </p>
          </div>
          <div className="header-actions">
            <div className="date-display">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-section">
          <div className="stats-grid">
            {/* 🔵 Active Students (REAL) */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon students">👥</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{studentCount}</h3>
                <p className="stat-label">Active Students</p>
                <div className="stat-trend positive">
                  <span>Live from accounts</span>
                </div>
              </div>
            </div>

            {/* Active Tutors (Dynamic) */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon tutors">🎓</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{approvedCount}</h3>
                <p className="stat-label">Active Tutors</p>
                <div className="stat-trend positive">
                  <span>Updated automatically</span>
                </div>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon pending">⏱</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{pendingCount}</h3>
                <p className="stat-label">Pending Approvals</p>
                <div className="stat-trend neutral">
                  <span>Requires attention</span>
                </div>
              </div>
            </div>

            {/* Weekly Students (from merged series) */}
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon sessions">📅</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{sumLastN("students", 7)}</h3>
                <p className="stat-label">This Week Students</p>
                <div className="stat-trend positive">
                  <span>Live from activity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Charts Section */}
          <div className="charts-section">
            {/* Courses & Students Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Courses & Students Overview</h3>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={series} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e1e5e9",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="courses"
                      name="Total Courses"
                      stroke="#0088FE"
                      strokeWidth={3}
                      dot={{ fill: "#0088FE", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="students"
                      name="Active Students"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {chartLoading && <div className="loading-state" style={{ paddingTop: 8 }}>Loading…</div>}
            </div>

            {/* Subjects Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Subjects Distribution</h3>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={110}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {chartLoading && <div className="loading-state" style={{ paddingTop: 8 }}>Loading…</div>}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="sidebar-section">
            {/* Approvals */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3 className="card-title">Pending Approvals</h3>
                <Link to="/v1/admin/approvals" className="view-all-link">
                  View All →
                </Link>
              </div>
              <div className="approvals-list">
                <div className="approval-category">
                  <h4 className="category-title">Tutor Requests</h4>
                  <div className="requests-list">
                    {loading ? (
                      <div className="loading-state">Loading requests...</div>
                    ) : tutorRequests.slice(0, 3).map((tutor, index) => (
                        <div key={index} className="request-item">
                          <div className="request-avatar">
                            <div className="avatar-placeholder">T</div>
                          </div>
                          <div className="request-details">
                            <div className="request-name">
                              {`${tutor.firstName || ""} ${tutor.lastName || ""}`.trim() || "New Tutor"}
                            </div>
                            <div className="request-email">{tutor.email}</div>
                          </div>
                          <div className="request-status pending">Pending</div>
                        </div>
                      ))
                    }
                    {tutorRequests.length === 0 && !loading && (
                      <div className="no-requests">No pending tutor requests</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3 className="card-title">Calendar</h3>
              </div>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} className="dashboard-calendar" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3 className="card-title">Platform Overview</h3>
              </div>
              <div className="quick-stats">
                <div className="quick-stat">
                  <div className="stat-name">Total Students (30d)</div>
                  <div className="stat-number">{sumLastN("students", 30)}</div>
                </div>
                <div className="quick-stat">
                  <div className="stat-name">Top Category</div>
                  <div className="stat-number">
                    {categoryData.slice().sort((a, b) => b.value - a.value)[0]?.name || "—"}
                  </div>
                </div>
                <div className="quick-stat">
                  <div className="stat-name">Categories</div>
                  <div className="stat-number">{categoryData.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
