import "../../assets/admin.assets/admin.dashboard.css";
import "../../assets/admin.assets/admin.header.css";
import "../../assets/admin.assets/admin.sidebar.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPending, getApproved } from "../../apis/admin.apis/admin.approvals.api";
import {
  LineChart, Line, PieChart, Pie,
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
    { name: "May", sessions: 65, tutors: 35 },
    { name: "Jun", sessions: 70, tutors: 40 },
  ];

  const pieData = [
    { name: "Math", value: 40 },
    { name: "Science", value: 30 },
    { name: "English", value: 20 },
    { name: "Other", value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [pendingTutors, pendingInst, approved] = await Promise.all([
          getPending("tutor"),
          getPending("institution"),
          getApproved("tutor", 3),
        ]);
        setPendingCount((pendingTutors?.length || 0) + (pendingInst?.length || 0));
        setTutorRequests(pendingTutors || []);
        setInstitutionRequests(pendingInst || []);
        setApprovedTutors(approved || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <AdminSidebar />

      <main className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="welcome-title">Welcome Back</h1>
            <p className="welcome-subtitle">Manage Nexa insights and monitor platform activity</p>
          </div>
          <div className="header-actions">
            <div className="date-display">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon students">👥</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">156</h3>
                <p className="stat-label">Active Students</p>
                <div className="stat-trend positive">
                  <span>+12% this month</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon tutors">🎓</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">47</h3>
                <p className="stat-label">Active Tutors</p>
                <div className="stat-trend positive">
                  <span>+5% this month</span>
                </div>
              </div>
            </div>

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

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon sessions">📅</div>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">89</h3>
                <p className="stat-label">This Week Sessions</p>
                <div className="stat-trend positive">
                  <span>+8% from last week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Charts Section */}
          <div className="charts-section">
            {/* Sessions Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Sessions Overview</h3>
                <div className="chart-actions">
                  <select className="time-filter">
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                    <option>Last month</option>
                  </select>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#666" 
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e1e5e9',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sessions" 
                      stroke="#0088FE" 
                      strokeWidth={3}
                      dot={{ fill: '#0088FE', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="tutors" 
                      stroke="#00C49F" 
                      strokeWidth={3}
                      dot={{ fill: '#00C49F', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
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
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="sidebar-section">
            {/* Approvals */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3 className="card-title">Pending Approvals</h3>
                <Link to="/v1/admin/approvals" className="view-all-link">View All →</Link>
              </div>
              <div className="approvals-list">
                <div className="approval-category">
                  <h4 className="category-title">Tutor Requests</h4>
                  <div className="requests-list">
                    {loading ? (
                      <div className="loading-state">Loading requests...</div>
                    ) : tutorRequests.slice(0, 2).map((tutor, index) => (
                      <div key={index} className="request-item">
                        <div className="request-avatar">
                          <div className="avatar-placeholder">T</div>
                        </div>
                        <div className="request-details">
                          <div className="request-name">{tutor.name || "New Tutor"}</div>
                          <div className="request-email">{tutor.email}</div>
                        </div>
                        <div className="request-status pending">Pending</div>
                      </div>
                    ))}
                    {tutorRequests.length === 0 && !loading && (
                      <div className="no-requests">No pending tutor requests</div>
                    )}
                  </div>
                </div>

                <div className="approval-category">
                  <h4 className="category-title">Institution Requests</h4>
                  <div className="requests-list">
                    {loading ? (
                      <div className="loading-state">Loading requests...</div>
                    ) : institutionRequests.slice(0, 2).map((institution, index) => (
                      <div key={index} className="request-item">
                        <div className="request-avatar">
                          <div className="avatar-placeholder">I</div>
                        </div>
                        <div className="request-details">
                          <div className="request-name">{institution.institutionName || "New Institution"}</div>
                          <div className="request-email">{institution.email}</div>
                        </div>
                        <div className="request-status pending">Pending</div>
                      </div>
                    ))}
                    {institutionRequests.length === 0 && !loading && (
                      <div className="no-requests">No pending institution requests</div>
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
                <Calendar 
                  onChange={setDate} 
                  value={date}
                  className="dashboard-calendar"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3 className="card-title">Platform Overview</h3>
              </div>
              <div className="quick-stats">
                <div className="quick-stat">
                  <div className="stat-name">Total Sessions</div>
                  <div className="stat-number">1,234</div>
                </div>
                <div className="quick-stat">
                  <div className="stat-name">Completion Rate</div>
                  <div className="stat-number">94%</div>
                </div>
                <div className="quick-stat">
                  <div className="stat-name">Avg. Rating</div>
                  <div className="stat-number">4.8/5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
