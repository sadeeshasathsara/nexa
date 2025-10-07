import { useEffect, useState } from "react";
import "../../assets/admin.assets/admin.dashboard.css";
import "../../assets/admin.assets/admin.settings.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { getAdminMe, updateAdminMe, changeAdminPasswordApi } from "../../apis/admin.apis/admin.profile.api";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwdBusy, setPwdBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [me, setMe] = useState({ name: "", email: "" });

  // password form state
  const [pwd, setPwd] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // show/hide toggles
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const mismatch = pwd.newPassword !== pwd.confirmPassword && pwd.confirmPassword.length > 0;
  const invalidPwd =
    !pwd.currentPassword ||
    !pwd.newPassword ||
    pwd.newPassword.length < 6 ||
    pwd.confirmPassword.length === 0 ||
    mismatch;

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const profile = await getAdminMe();
      setMe({ name: profile.name || "", email: profile.email || "" });
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const updated = await updateAdminMe({ name: me.name, email: me.email });
      setMe({ name: updated.name, email: updated.email });
      setSuccess("Profile updated successfully!");
    } catch (e) {
      setError(e?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function changePwd(e) {
    e.preventDefault();
    if (invalidPwd) return;
    setError("");
    setSuccess("");
    setPwdBusy(true);
    try {
      await changeAdminPasswordApi({
        currentPassword: pwd.currentPassword,
        newPassword: pwd.newPassword,
      });
      setPwd({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setSuccess("Password updated successfully!");
    } catch (e) {
      setError(e?.response?.data?.message || "Password update failed");
    } finally {
      setPwdBusy(false);
    }
  }

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <AdminSidebar />

      <main className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="welcome-title">Admin Settings</h1>
            <p className="welcome-subtitle">Manage your profile and security settings</p>
          </div>
          <div className="header-actions">
            <div className="admin-badge">
              <i className="bx bx-shield-quarter"></i>
              Administrator
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="message-card error" onClick={clearMessages}>
            <i className="bx bx-error-circle"></i>
            <div className="message-content">
              <div className="message-title">Error</div>
              <div className="message-text">{error}</div>
            </div>
            <i className="bx bx-x close-icon"></i>
          </div>
        )}

        {success && (
          <div className="message-card success" onClick={clearMessages}>
            <i className="bx bx-check-circle"></i>
            <div className="message-content">
              <div className="message-title">Success</div>
              <div className="message-text">{success}</div>
            </div>
            <i className="bx bx-x close-icon"></i>
          </div>
        )}

        <div className="settings-content">
          {/* Profile Section */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-title">
                <i className="bx bx-user"></i>
                Profile Information
              </div>
              <p className="section-subtitle">Update your personal information</p>
            </div>

            <div className="settings-card">
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  Loading profile...
                </div>
              ) : (
                <form onSubmit={saveProfile} className="settings-form">
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
                        value={me.name}
                        onChange={(e) => setMe({...me, name: e.target.value})}
                        placeholder="Enter your full name"
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
                        value={me.email}
                        onChange={(e) => setMe({...me, email: e.target.value})}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="btn-primary" 
                      type="submit" 
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <div className="loading-spinner small white"></div>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <i className="bx bx-save"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <a href="/v1/admin/register" className="btn-secondary">
                      <i className="bx bx-user-plus"></i>
                      Add New Admin
                    </a>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* Security Section */}
          <section className="settings-section">
            <div className="section-header">
              <div className="section-title">
                <i className="bx bx-lock-alt"></i>
                Security Settings
              </div>
              <p className="section-subtitle">Change your password and security preferences</p>
            </div>

            <div className="settings-card">
              <form onSubmit={changePwd} className="settings-form">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Current Password</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-container password">
                    <i className="bx bx-lock input-icon"></i>
                    <input
                      className="form-input"
                      type={show.current ? "text" : "password"}
                      value={pwd.currentPassword}
                      onChange={(e) => setPwd({...pwd, currentPassword: e.target.value})}
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShow(s => ({ ...s, current: !s.current }))}
                    >
                      <i className={`bx ${show.current ? 'bx-hide' : 'bx-show'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">New Password</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-container password">
                    <i className="bx bx-key input-icon"></i>
                    <input
                      className="form-input"
                      type={show.new ? "text" : "password"}
                      value={pwd.newPassword}
                      onChange={(e) => setPwd({...pwd, newPassword: e.target.value})}
                      placeholder="At least 6 characters"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShow(s => ({ ...s, new: !s.new }))}
                    >
                      <i className={`bx ${show.new ? 'bx-hide' : 'bx-show'}`}></i>
                    </button>
                  </div>
                  {pwd.newPassword && pwd.newPassword.length < 6 && (
                    <div className="input-hint error">
                      Password must be at least 6 characters long
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Confirm New Password</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-container password">
                    <i className="bx bx-key input-icon"></i>
                    <input
                      className="form-input"
                      type={show.confirm ? "text" : "password"}
                      value={pwd.confirmPassword}
                      onChange={(e) => setPwd({...pwd, confirmPassword: e.target.value})}
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
                    >
                      <i className={`bx ${show.confirm ? 'bx-hide' : 'bx-show'}`}></i>
                    </button>
                  </div>
                  {mismatch && (
                    <div className="input-hint error">
                      New password and confirm password do not match
                    </div>
                  )}
                  {pwd.confirmPassword && !mismatch && (
                    <div className="input-hint success">
                      Passwords match
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button 
                    className="btn-primary" 
                    type="submit" 
                    disabled={pwdBusy || invalidPwd}
                  >
                    {pwdBusy ? (
                      <>
                        <div className="loading-spinner small white"></div>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <i className="bx bx-refresh"></i>
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}