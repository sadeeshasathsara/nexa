import { useEffect, useState } from "react";
import "../../assets/admin.assets/admin.dashboard.css"; // reuse styles
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { getAdminMe, updateAdminMe, changeAdminPasswordApi } from "../../apis/admin.apis/admin.profile.api";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [pwdBusy, setPwdBusy] = useState(false);
  const [error, setError]     = useState("");
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
    (async () => {
      try {
        const profile = await getAdminMe();
        setMe({ name: profile.name || "", email: profile.email || "" });
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function saveProfile(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const updated = await updateAdminMe({ name: me.name, email: me.email });
      setMe({ name: updated.name, email: updated.email });
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
    setPwdBusy(true);
    try {
      await changeAdminPasswordApi({
        currentPassword: pwd.currentPassword,
        newPassword: pwd.newPassword,
      });
      setPwd({ currentPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password updated");
    } catch (e) {
      setError(e?.response?.data?.message || "Password update failed");
    } finally {
      setPwdBusy(false);
    }
  }

  // inline SVG icons (eye / eye-off)
  const Eye = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
  const EyeOff = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <div className="admin-shell">
      <AdminHeader />
      <AdminSidebar />

      <main className="main">
        <h1 className="page-title">Settings</h1>
        <p className="page-sub">Manage your admin profile and security</p>

        {error && (
          <div className="card" style={{ borderColor: "#FF3B30", padding: 16, marginBottom: 16, color: "#FF3B30" }}>
            {error}
          </div>
        )}

        {/* Profile */}
        <section className="card" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <h3 className="card-title">Profile</h3>
            <a className="card-action" href="/v1/admin/register"> + Add new admin</a>
          </div>
          <div style={{ padding: 20 }}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <form onSubmit={saveProfile} style={{ display:"grid", gap:12, maxWidth: 480 }}>
                <label>
                  <div className="stat-label" style={{ marginBottom:6 }}>Name</div>
                  <input
                    className="search-bar"
                    style={{ width:"100%" }}
                    value={me.name}
                    onChange={(e)=>setMe({...me, name:e.target.value})}
                    placeholder="Admin name"
                    required
                  />
                </label>
                <label>
                  <div className="stat-label" style={{ marginBottom:6 }}>Email</div>
                  <input
                    className="search-bar"
                    style={{ width:"100%" }}
                    type="email"
                    value={me.email}
                    onChange={(e)=>setMe({...me, email:e.target.value})}
                    placeholder="admin@example.com"
                    required
                  />
                </label>
                <div>
                  <button className="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Security */}
        <section className="card">
          <div className="card-header">
            <h3 className="card-title">Security</h3>
          </div>
          <div style={{ padding: 20 }}>
            <form onSubmit={changePwd} style={{ display:"grid", gap:12, maxWidth: 480 }}>
              {/* Current password */}
              <label>
                <div className="stat-label" style={{ marginBottom:6 }}>Current password</div>
                <div className="pwd-wrap">
                  <input
                    className="search-bar password-input"
                    type={show.current ? "text" : "password"}
                    name="current-password"
                    placeholder="current-password"
                    autoComplete="current-password"
                    value={pwd.currentPassword}
                    onChange={(e)=>setPwd({...pwd, currentPassword:e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={()=>setShow(s=>({ ...s, current: !s.current }))}
                    aria-label={show.current ? "Hide current password" : "Show current password"}
                    title={show.current ? "Hide" : "Show"}
                  >
                    {show.current ? EyeOff : Eye}
                  </button>
                </div>
              </label>

              {/* New password */}
              <label>
                <div className="stat-label" style={{ marginBottom:6 }}>New password</div>
                <div className="pwd-wrap">
                  <input
                    className="search-bar password-input"
                    type={show.new ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={pwd.newPassword}
                    onChange={(e)=>setPwd({...pwd, newPassword:e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={()=>setShow(s=>({ ...s, new: !s.new }))}
                    aria-label={show.new ? "Hide new password" : "Show new password"}
                    title={show.new ? "Hide" : "Show"}
                  >
                    {show.new ? EyeOff : Eye}
                  </button>
                </div>
              </label>

              {/* Confirm new password */}
              <label>
                <div className="stat-label" style={{ marginBottom:6 }}>Confirm new password</div>
                <div className="pwd-wrap">
                  <input
                    className="search-bar password-input"
                    type={show.confirm ? "text" : "password"}
                    placeholder="Re-type new password"
                    value={pwd.confirmPassword}
                    onChange={(e)=>setPwd({...pwd, confirmPassword:e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={()=>setShow(s=>({ ...s, confirm: !s.confirm }))}
                    aria-label={show.confirm ? "Hide confirm password" : "Show confirm password"}
                    title={show.confirm ? "Hide" : "Show"}
                  >
                    {show.confirm ? EyeOff : Eye}
                  </button>
                </div>
                {mismatch && (
                  <div style={{ color:"#FF3B30", marginTop:8, fontSize:13 }}>
                    New password and confirm password do not match.
                  </div>
                )}
              </label>

              <div>
                <button className="btn btn-primary" type="submit" disabled={pwdBusy || invalidPwd}>
                  {pwdBusy ? "Updating..." : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
