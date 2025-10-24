import { useState } from "react";
import "../../assets/admin.assets/admin.dashboard.css";
import "../../assets/admin.assets/admin.settings.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { registerNewAdmin } from "../../apis/admin.apis/admin.profile.api";

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); 
    setMsg("");
    setBusy(true);
    try {
      const res = await registerNewAdmin(form);
      setMsg(res.message || "Admin created successfully");
      setForm({ name: "", email: "", password: "" });
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-layout">
      <AdminHeader />
      <AdminSidebar />

      <main className="admin-main-content">
        {/* Header Section */}
        <div className="content-header">
          <div className="header-info">
            <h1 className="page-title">Register Admin</h1>
            <p className="page-subtitle">Create another admin account for your platform</p>
          </div>
        </div>

        <div className="content-body">
          {/* Messages */}
          {err && (
            <div className="alert alert-error">
              <i className="bx bx-error-circle"></i>
              <span>{err}</span>
            </div>
          )}
          
          {msg && (
            <div className="alert" style={{ 
              background: 'rgba(52, 199, 89, 0.05)', 
              border: '1px solid rgba(52, 199, 89, 0.2)', 
              color: 'var(--success)' 
            }}>
              <i className="bx bx-check-circle"></i>
              <span>{msg}</span>
            </div>
          )}

          {/* Registration Form */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">New Admin Account</h3>
            </div>
            
            <div style={{ padding: '24px' }}>
              <form onSubmit={onSubmit} className="settings-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      value={form.password}
                      onChange={(e) => setForm({...form, password: e.target.value})}
                      placeholder="At least 6 characters"
                      minLength="6"
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <a 
                    href="/v1/admin/settings" 
                    className="btn btn-secondary"
                  >
                    <i className="bx bx-arrow-back"></i>
                    Back to Settings
                  </a>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={busy}
                  >
                    {busy ? (
                      <>
                        <i className="bx bx-loader-circle bx-spin"></i>
                        Creating Admin...
                      </>
                    ) : (
                      <>
                        <i className="bx bx-user-plus"></i>
                        Create Admin Account
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Admin Permissions</h3>
            </div>
            <div style={{ padding: '24px' }}>
              <div className="quick-stats">
                <div className="quick-stat">
                  <div className="stat-name">Full Access</div>
                  <div className="stat-number">All Features</div>
                </div>
                <div className="quick-stat">
                  <div className="stat-name">User Management</div>
                  <div className="stat-number">Complete Control</div>
                </div>
                <div className="quick-stat">
                  <div className="stat-name">Content Moderation</div>
                  <div className="stat-number">Full Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
