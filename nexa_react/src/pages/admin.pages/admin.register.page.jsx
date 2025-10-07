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
      setMsg(res.message || "Admin created successfully!");
      setForm({ name: "", email: "", password: "" });
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  const clearMessages = () => {
    setErr("");
    setMsg("");
  };

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <AdminSidebar />

      <main className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="welcome-title">Register New Admin</h1>
            <p className="welcome-subtitle">Create a new administrator account</p>
          </div>
          <div className="header-actions">
            <div className="admin-badge">
              <i className="bx bx-user-plus"></i>
              Add Administrator
            </div>
          </div>
        </div>

        {/* Messages */}
        {err && (
          <div className="message-card error" onClick={clearMessages}>
            <i className="bx bx-error-circle"></i>
            <div className="message-content">
              <div className="message-title">Error</div>
              <div className="message-text">{err}</div>
            </div>
            <i className="bx bx-x close-icon"></i>
          </div>
        )}

        {msg && (
          <div className="message-card success" onClick={clearMessages}>
            <i className="bx bx-check-circle"></i>
            <div className="message-content">
              <div className="message-title">Success</div>
              <div className="message-text">{msg}</div>
            </div>
            <i className="bx bx-x close-icon"></i>
          </div>
        )}

        <div className="settings-content">
          {/* Registration Form */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-title">
                <i className="bx bx-user-plus"></i>
                New Administrator
              </div>
              <p className="section-subtitle">Fill in the details to create a new admin account</p>
            </div>

            <div className="settings-card">
              <form onSubmit={onSubmit} className="settings-form">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Full Name</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-container">
                    <i className="bx bx-user input-icon"></i>
                    <input
                      className="form-input"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Email Address</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-container">
                    <i className="bx bx-envelope input-icon"></i>
                    <input
                      className="form-input"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Password</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-container">
                    <i className="bx bx-lock input-icon"></i>
                    <input
                      className="form-input"
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({...form, password: e.target.value})}
                      placeholder="At least 6 characters"
                      required
                      minLength="6"
                    />
                  </div>
                  {form.password && form.password.length < 6 && (
                    <div className="input-hint error">
                      Password must be at least 6 characters long
                    </div>
                  )}
                  {form.password && form.password.length >= 6 && (
                    <div className="input-hint success">
                      Password strength: Good
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button 
                    className="btn-primary" 
                    type="submit" 
                    disabled={busy || form.password.length < 6}
                  >
                    {busy ? (
                      <>
                        <div className="loading-spinner small white"></div>
                        Creating Admin...
                      </>
                    ) : (
                      <>
                        <i className="bx bx-user-plus"></i>
                        Create Admin Account
                      </>
                    )}
                  </button>
                  <a href="/v1/admin/settings" className="btn-secondary">
                    <i className="bx bx-arrow-back"></i>
                    Back to Settings
                  </a>
                </div>
              </form>
            </div>
          </section>

          {/* Admin Privileges Info */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-title">
                <i className="bx bx-shield"></i>
                Administrator Privileges
              </div>
            </div>
            <div className="tips-card">
              <div className="tip-item">
                <i className="bx bx-cog"></i>
                <div className="tip-content">
                  <div className="tip-title">Full System Access</div>
                  <div className="tip-text">Complete access to all admin features and settings</div>
                </div>
              </div>
              <div className="tip-item">
                <i className="bx bx-user-check"></i>
                <div className="tip-content">
                  <div className="tip-title">User Management</div>
                  <div className="tip-text">Ability to approve/reject tutor and institution accounts</div>
                </div>
              </div>
              <div className="tip-item">
                <i className="bx bx-chart"></i>
                <div className="tip-content">
                  <div className="tip-title">Analytics Access</div>
                  <div className="tip-text">View platform analytics and generate reports</div>
                </div>
              </div>
              <div className="tip-item">
                <i className="bx bx-lock-alt"></i>
                <div className="tip-content">
                  <div className="tip-title">Security Settings</div>
                  <div className="tip-text">Manage system security and admin permissions</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}