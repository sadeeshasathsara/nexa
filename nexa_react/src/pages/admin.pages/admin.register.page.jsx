import { useState } from "react";
import "../../assets/admin.assets/admin.dashboard.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { registerNewAdmin } from "../../apis/admin.apis/admin.profile.api";

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");
  const [err, setErr]   = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    setBusy(true);
    try {
      const res = await registerNewAdmin(form);
      setMsg(res.message || "Admin created");
      setForm({ name:"", email:"", password:"" });
    } catch (e) {
      setErr(e?.response?.data?.message || "Signup failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-shell">
      <AdminHeader />
      <AdminSidebar />

      <main className="main">
        <h1 className="page-title">Register Admin</h1>
        <p className="page-sub">Create another admin account</p>

        {err && <div className="card" style={{ borderColor: "#FF3B30", padding: 16, marginBottom: 16, color: "#FF3B30" }}>{err}</div>}
        {msg && <div className="card" style={{ borderColor: "#34C759", padding: 16, marginBottom: 16, color: "#2e7d32" }}>{msg}</div>}

        <section className="card">
          <div className="card-header">
            <h3 className="card-title">New Admin</h3>
          </div>
          <div style={{ padding: 20 }}>
            <form onSubmit={onSubmit} style={{ display:"grid", gap:12, maxWidth: 480 }}>
              <label>
                <div className="stat-label" style={{ marginBottom:6 }}>Name</div>
                <input
                  className="search-bar"
                  value={form.name}
                  onChange={(e)=>setForm({...form, name:e.target.value})}
                  placeholder="Full name"
                  required
                />
              </label>
              <label>
                <div className="stat-label" style={{ marginBottom:6 }}>Email</div>
                <input
                  className="search-bar"
                  type="email"
                  value={form.email}
                  onChange={(e)=>setForm({...form, email:e.target.value})}
                  placeholder="admin2@example.com"
                  required
                />
              </label>
              <label>
                <div className="stat-label" style={{ marginBottom:6 }}>Password</div>
                <input
                  className="search-bar"
                  type="password"
                  value={form.password}
                  onChange={(e)=>setForm({...form, password:e.target.value})}
                  placeholder="At least 6 characters"
                  required
                />
              </label>
              <div>
                <button className="btn btn-primary" type="submit" disabled={busy}>
                  {busy ? "Creating..." : "Create admin"}
                </button>
                <a className="card-action" style={{ marginLeft: 12 }} href="/v1/admin/settings">Back to settings</a>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
