import "../../assets/admin.assets/admin.dashboard.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPending, decideByEmail, getApproved } from "../../apis/admin.apis/admin.approvals.api";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AdminDashboardPage() {
  const [pendingCount, setPendingCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [tutorRequests, setTutorRequests] = useState([]);
  const [institutionRequests, setInstitutionRequests] = useState([]);
  const [approvedTutors, setApprovedTutors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Chart sample data
  const chartData = [
    { name: "Jan", sessions: 30, tutors: 20 },
    { name: "Feb", sessions: 45, tutors: 25 },
    { name: "Mar", sessions: 60, tutors: 30 },
    { name: "Apr", sessions: 50, tutors: 28 },
  ];

  const pieData = [
    { name: "Math", value: 40 },
    { name: "Science", value: 30 },
    { name: "English", value: 20 },
    { name: "Other", value: 10 },
  ];
  const colors = ["#7C3AED", "#007AFF", "#34C759", "#FF9500"];

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const [pendingTutors, pendingInst, approved] = await Promise.all([
        getPending("tutor"),
        getPending("institution"),
        getApproved("tutor", 3),
      ]);
      setPendingCount((pendingTutors?.length || 0) + (pendingInst?.length || 0));
      setTutorRequests(pendingTutors || []);
      setInstitutionRequests(pendingInst || []);
      setApprovedTutors(approved || []);
      setLoading(false);
    }
    loadAll();
  }, []);

  return (
    <div className="admin-shell">
      <AdminHeader />
      <AdminSidebar />

      <main className="main">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">Welcome back! Manage Nexa insights here.</p>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card purple">Active Students <h2>156</h2></div>
          <div className="stat-card blue">Active Tutors <h2>47</h2></div>
          <div className="stat-card orange">Pending Approvals <h2>{pendingCount}</h2></div>
          <div className="stat-card green">This Week Sessions <h2>89</h2></div>
        </div>

        {/* Approvals Section */}
        <section className="card approvals-card">
          <div className="card-header">
            <h3 className="card-title">Approvals</h3>
            <Link to="/v1/admin/approvals" className="card-action">View All →</Link>
          </div>
          <div className="approvals-grid">
            <div>
              <h4 className="sub-title">Tutor Requests</h4>
              {loading ? "Loading…" : tutorRequests.slice(0, 3).map((t, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot purple" />
                  <div>{t.name || "(No Name)"} — {t.email}</div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="sub-title">Institution Requests</h4>
              {loading ? "Loading…" : institutionRequests.slice(0, 3).map((iR, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot blue" />
                  <div>{iR.institutionName || "(No Name)"} — {iR.email}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Charts + Calendar */}
        <div className="content-grid">
          <section className="card">
            <div className="card-header">
              <h3 className="card-title">Sessions Overview</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" stroke="#7C3AED" />
                <Line type="monotone" dataKey="tutors" stroke="#007AFF" />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className="card">
            <div className="card-header">
              <h3 className="card-title">Subjects Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" label outerRadius={100}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </section>

          <section className="card">
            <div className="card-header">
              <h3 className="card-title">Calendar</h3>
            </div>
            <Calendar onChange={setDate} value={date} />
          </section>
        </div>
      </main>
    </div>
  );
}
