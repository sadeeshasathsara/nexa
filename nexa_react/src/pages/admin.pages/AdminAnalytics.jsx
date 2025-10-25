import { useEffect, useMemo, useState } from "react";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import {
  getAnalyticsSummary,
  getQuizAttempts,
  getDonations,
  getCourses,
  downloadQuizAttemptsPDF,
  downloadDonationsPDF,
  downloadCoursesPDF,
} from "../../apis/admin.apis/admin.analytics.api";
import { downloadBlob } from "../../tools/admin.tools/downloadBlob.js";
import { downloadCSV } from "../../tools/admin.tools/downloadCSV.js";
import "../../assets/admin.assets/admin.analytics.css";

/* Recharts */
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* --------- Small UI bits --------- */
const AnalyticsCard = ({ title, value, sub, icon }) => (
  <div className="analytics-stat-card">
    <div className="analytics-stat-icon-wrapper">
      <div className="analytics-stat-icon">{icon || "📊"}</div>
    </div>
    <div className="analytics-stat-content">
      <div className="analytics-stat-value">{value}</div>
      <div className="analytics-stat-label">{title}</div>
      {sub && <div className="analytics-stat-sub">{sub}</div>}
    </div>
  </div>
);

const Section = ({ title, actions, children }) => (
  <div className="analytics-data-section">
    <div className="analytics-section-header">
      <h3 className="analytics-section-title">{title}</h3>
      <div className="analytics-section-actions">{actions}</div>
    </div>
    {children}
  </div>
);

const Table = ({ columns, rows, keyField = "_id" }) => (
  <div className="analytics-table-container">
    <table className="analytics-data-table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((r) => (
            <tr key={r[keyField] || Math.random()}>
              {columns.map((c) => (
                <td key={c.key}>
                  {c.render ? c.render(r) : String(r[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className="analytics-table-empty" colSpan={columns.length}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

/* ---------------- Page ---------------- */
export default function AdminAnalytics() {
  const [summary, setSummary] = useState(null);
  const [quiz, setQuiz] = useState({ rows: [], total: 0 });
  const [don, setDon] = useState({ rows: [], total: 0, totalAmount: 0 });
  const [crs, setCrs] = useState({ rows: [], total: 0, publishedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Filters (client-side)
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const [s, q, d, c] = await Promise.all([
        getAnalyticsSummary(),
        getQuizAttempts({ limit: 1000 }), // load enough rows to visualize
        getDonations({ limit: 1000 }),
        getCourses({ limit: 1000 }),
      ]);
      setSummary(s);
      setQuiz(q);
      setDon(d);
      setCrs(c);
    } catch (e) {
      console.error(e);
      setErr("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  /* ---------- Helpers ---------- */
  const inRange = (date) => {
    if (!date) return true;
    const t = new Date(date).getTime();
    const f = from ? new Date(from).setHours(0, 0, 0, 0) : null;
    const tt = to ? new Date(to).setHours(23, 59, 59, 999) : null;
    if (f && t < f) return false;
    if (tt && t > tt) return false;
    return true;
  };

  /* ---------- Filtered rows ---------- */
  const quizRows = useMemo(() => (quiz.rows || []).filter(r => inRange(r.completedAt)), [quiz, from, to]);
  const donRows  = useMemo(() => (don.rows  || []).filter(r => inRange(r.createdAt)),  [don,  from, to]);
  const crsRows  = useMemo(() => (crs.rows  || []).filter(r => inRange(r.createdAt)),  [crs,  from, to]);

  /* ---------- Chart data ---------- */

  // 1) Line: quiz attempts per day + avg %
  const quizTrend = useMemo(() => {
    const map = new Map();
    for (const r of quizRows) {
      if (!r.completedAt) continue;
      const key = new Date(r.completedAt).toISOString().slice(0, 10); // YYYY-MM-DD
      const obj = map.get(key) || { date: key, attempts: 0, pctSum: 0 };
      obj.attempts += 1;
      obj.pctSum += Number(r.percentage || 0);
      map.set(key, obj);
    }
    return Array.from(map.values())
      .map(v => ({ name: v.date, attempts: v.attempts, avgPct: +(v.pctSum / v.attempts || 0).toFixed(1) }))
      .sort((a,b) => a.name.localeCompare(b.name));
  }, [quizRows]);

  // 2) Bar: courses by category (published only)
  const coursesByCategory = useMemo(() => {
    const map = new Map();
    for (const r of crsRows) {
      if (r.status !== "published") continue;
      const key = r.category || "Uncategorized";
      map.set(key, (map.get(key) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [crsRows]);

  // 3) Pie: donations by status
  const donationsByStatus = useMemo(() => {
    const map = new Map();
    for (const r of donRows) {
      const key = r.status || "unknown";
      map.set(key, (map.get(key) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [donRows]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7", "#EF4444"];

  /* ---------- Table columns ---------- */
  const quizCols = [
    { key: "studentId", label: "StudentId" },
    { key: "courseId",  label: "CourseId" },
    { key: "quizId",    label: "QuizId" },
    { key: "totalScore",label: "Score" },
    { key: "maxScore",  label: "Max" },
    { key: "percentage",label: "%" },
    { key: "passed",    label: "Passed", render: r => (r.passed ? "Yes" : "No") },
    { key: "timeSpent", label: "Time(s)" },
    { key: "completedAt", label: "Completed", render: r => r.completedAt ? new Date(r.completedAt).toLocaleString() : "" },
  ];
  const donCols = [
    { key: "donor",    label: "Donor", render: r => r.donor ? `${r.donor.firstName ?? ""} ${r.donor.lastName ?? ""}`.trim() : "—" },
    { key: "email",    label: "Email", render: r => r.donor?.email ?? "—" },
    { key: "amount",   label: "Amount" },
    { key: "currency", label: "Currency" },
    { key: "purpose",  label: "Purpose" },
    { key: "status",   label: "Status" },
    { key: "createdAt",label: "Date", render: r => new Date(r.createdAt).toLocaleString() },
  ];
  const courseCols = [
    { key: "title",     label: "Title" },
    { key: "tutorId",   label: "TutorId" },
    { key: "category",  label: "Category" },
    { key: "status",    label: "Status" },
    { key: "isActive",  label: "Active", render: r => (r.isActive ? "Yes" : "No") },
    { key: "students",  label: "Enrolled", render: r => (r.enrolledStudents?.length ?? 0) },
    { key: "createdAt", label: "Created", render: r => new Date(r.createdAt).toLocaleString() },
  ];

  /* ---------- Exports ---------- */
  const handleDownloadPDF = async (kind) => {
    const map = {
      quiz:    [downloadQuizAttemptsPDF, "quiz_attempts.pdf"],
      donations:[downloadDonationsPDF,   "donations.pdf"],
      courses: [downloadCoursesPDF,      "courses.pdf"],
    };
    const [fn, name] = map[kind] || [];
    if (!fn) return;
    downloadBlob(await fn(), name);
  };

  const exportCSV = (kind) => {
    if (kind === "quiz")      return downloadCSV(quizRows,    "quiz_attempts.csv");
    if (kind === "donations") return downloadCSV(donRows,     "donations.csv");
    if (kind === "courses")   return downloadCSV(crsRows,     "courses.csv");
  };

  const todayStr = new Date().toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric" });

  return (
    <div className="admin-analytics-layout">
      <AdminSidebar />
      <div className="admin-analytics-main">
        {/* pass no props; header will fetch tutors to index search */}
        <AdminHeader />

        <div className="admin-analytics-content">
          {/* Page header */}
          <div className="analytics-page-header">
            <div className="analytics-header-content">
              <h1 className="analytics-page-title">Reports & Analytics</h1>
              <p className="analytics-page-subtitle">Visualize performance and export data</p>
            </div>
            <div className="analytics-header-actions">
              <div className="analytics-date-display">{todayStr}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="analytics-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>From</label>
                <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} />
              </div>
              <div className="filter-group">
                <label>To</label>
                <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} />
              </div>
              <button className="analytics-btn" onClick={()=>{setFrom(""); setTo("");}}>Clear</button>
              <button className="analytics-btn" onClick={load}>Reload</button>
            </div>
          </div>

          {/* Summary cards */}
          {summary && (
            <div className="analytics-cards-grid">
              <AnalyticsCard title="Total Courses" value={summary.courses.total} sub={`Published ${summary.courses.published}`} icon="📚" />
              <AnalyticsCard title="Donations" value={(summary.donations.totalAmount).toFixed ? `$${summary.donations.totalAmount.toFixed(2)}` : summary.donations.totalAmount} sub={`Count ${summary.donations.count}`} icon="💰" />
              <AnalyticsCard title="Quiz Attempts" value={summary.quizzes.attempts} sub={`Pass Rate ${(summary.quizzes.passRate*100).toFixed(1)}%`} icon="📝" />
              <AnalyticsCard title="Avg Quiz %" value={summary.quizzes.avgPercentage.toFixed(1)} sub={`Completed Lessons ${summary.learning.totalCompletedLessons}`} icon="🎯" />
            </div>
          )}

          {/* Charts */}
          <div className="analytics-charts-grid">
            {/* Line: quiz trend */}
            <div className="chart-card">
              <div className="chart-header"><h3 className="chart-title">Quiz Attempts Over Time</h3></div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={quizTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="attempts" stroke="#0088FE" strokeWidth={3} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="avgPct"   stroke="#00C49F" strokeWidth={3} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar: categories */}
            <div className="chart-card">
              <div className="chart-header"><h3 className="chart-title">Courses by Category (Published)</h3></div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coursesByCategory} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Courses" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie: donations by status */}
            <div className="chart-card">
              <div className="chart-header"><h3 className="chart-title">Donations by Status</h3></div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={donationsByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
                      {donationsByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Error / Loading */}
          {err && <div className="analytics-error-state">{err}</div>}
          {loading && <div className="analytics-loading-state">Loading…</div>}

          {/* Tables */}
          {!loading && (
            <>
              <Section
                title={`Quiz Attempts (${quizRows.length})`}
                actions={
                  <>
                    <button className="analytics-btn" onClick={()=>exportCSV("quiz")}>Export CSV</button>
                    <button className="analytics-btn analytics-btn-primary" onClick={()=>handleDownloadPDF("quiz")}>Download PDF</button>
                  </>
                }
              >
                <Table columns={quizCols} rows={quizRows} />
              </Section>

              <Section
                title={`Donations (${donRows.length}) • Total: ${don.totalAmount}`}
                actions={
                  <>
                    <button className="analytics-btn" onClick={()=>exportCSV("donations")}>Export CSV</button>
                    <button className="analytics-btn analytics-btn-primary" onClick={()=>handleDownloadPDF("donations")}>Download PDF</button>
                  </>
                }
              >
                <Table columns={donCols} rows={donRows} />
              </Section>

              <Section
                title={`Courses (${crsRows.length}) • Published: ${crs.publishedCount}`}
                actions={
                  <>
                    <button className="analytics-btn" onClick={()=>exportCSV("courses")}>Export CSV</button>
                    <button className="analytics-btn analytics-btn-primary" onClick={()=>handleDownloadPDF("courses")}>Download PDF</button>
                  </>
                }
              >
                <Table columns={courseCols} rows={crsRows} />
              </Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
