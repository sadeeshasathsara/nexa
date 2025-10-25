// src/pages/admin.pages/admin.usermanage.page.jsx
import { useEffect, useMemo, useState } from "react";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { fetchUsers, setUserSuspended } from "../../apis/admin.apis/admin.users.api";
import "../../assets/admin.assets/admin.usermanage.css";

const ALLOWED_ROLES = ["student", "tutor", "donor"];

export default function AdminUserManagePage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");          // "student" | "tutor" | "donor" | ""
  const [status, setStatus] = useState("");      // "Active" | "Suspended" | ""
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("-createdAt");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  /* ===== Helpers ===== */
  const formatRole = (rawRole) => {
    const r = (rawRole || "").toLowerCase();
    if (!ALLOWED_ROLES.includes(r)) return "—";
    return r.charAt(0).toUpperCase() + r.slice(1);
  };

  const getRoleClass = (rawRole) => {
    const r = (rawRole || "").toLowerCase();
    switch (r) {
      case "student": return "admin-usermanage-role-student";
      case "tutor":   return "admin-usermanage-role-tutor";
      case "donor":   return "admin-usermanage-role-donor";
      default:        return "admin-usermanage-role-student";
    }
  };

  const getFullName = (u) => {
    if (u.firstName || u.lastName) return `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || "—";
    return u.name || "—";
  };

  const getAvatarInitial = (u) => (getFullName(u) || "U").charAt(0).toUpperCase();

  const deriveStatus = (u) => (u?.suspended ? "Suspended" : "Active");

  /* ===== Data load ===== */
  async function load() {
    setLoading(true);
    try {
      const roleParam = role ? role.toLowerCase() : "";
      const { rows: rawRows = [], total: rawTotal = 0, page: pg } = await fetchUsers({
        q, role: roleParam, status, page, limit, sort
      });

      // keep only allowed roles and normalize status
      const filtered = rawRows
        .filter((u) => ALLOWED_ROLES.includes((u.role || "").toLowerCase()))
        .map((u) => ({ ...u, status: u.status || deriveStatus(u) }));

      setRows(filtered);
      setTotal(roleParam || status || q ? filtered.length : (rawTotal || filtered.length));
      if (pg) setPage(pg);
    } catch (err) {
      console.error("Load users failed:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, limit, sort]);

  /* ===== Actions ===== */
  const handleToggle = async (u) => {
    const next = u.status !== "Suspended"; // active -> suspend; suspended -> activate
    try {
      await setUserSuspended(u._id, next);
      load();
    } catch (err) {
      console.error("Suspension update failed:", err);
      alert("Failed to update user status.");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const handleReset = () => {
    setQ("");
    setRole("");
    setStatus("");
    setPage(1);
    load();
  };

  return (
    <div className="admin-usermanage-layout">
      <AdminSidebar />
      <div className="admin-usermanage-main">
        <AdminHeader />

        <div className="admin-usermanage-page">
          {/* Header / Controls */}
          <div className="admin-usermanage-head">
            <div className="admin-usermanage-title">
              <h1>User Management</h1>
              <p>Manage platform users from the accounts collection</p>
            </div>
            <div className="admin-usermanage-actions">
              <select
                value={limit}
                onChange={(e) => setLimit(+e.target.value)}
                className="admin-usermanage-sort"
                aria-label="Rows per page"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="admin-usermanage-sort"
                aria-label="Sort by"
              >
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="firstName">Name A→Z</option>
                <option value="-firstName">Name Z→A</option>
              </select>
            </div>
          </div>

          {/* Responsive Filters */}
          <form className="admin-usermanage-filters" onSubmit={handleSearchSubmit}>
            <div className="admin-usermanage-search-container">
              <i className="bx bx-search admin-usermanage-search-icon" aria-hidden="true"></i>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or email…"
                className="admin-usermanage-search-input"
                aria-label="Search users"
              />
            </div>

            <div className="admin-usermanage-filter-row">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="admin-usermanage-filter-select"
                aria-label="Filter by role"
              >
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="donor">Donor</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="admin-usermanage-filter-select"
                aria-label="Filter by status"
              >
                <option value="">All Status</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>

              <div className="admin-usermanage-filter-actions">
                <button type="submit" className="admin-usermanage-btn-primary">Apply</button>
                <button type="button" className="admin-usermanage-btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </form>

          {/* Table */}
          <div className="admin-usermanage-table-wrap">
            <table className="admin-usermanage-table">
              <thead>
                <tr>
                  <th className="admin-usermanage-th">Name / Email</th>
                  <th className="admin-usermanage-th">Role</th>
                  <th className="admin-usermanage-th">Status</th>
                  <th className="admin-usermanage-th">Courses</th>
                  <th className="admin-usermanage-th">Violations</th>
                  <th className="admin-usermanage-th">Joined</th>
                  <th className="admin-usermanage-th"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u._id} className="admin-usermanage-tr">
                    <td className="admin-usermanage-td">
                      <div className="admin-usermanage-cell-name">
                        <div className="admin-usermanage-avatar">{getAvatarInitial(u)}</div>
                        <div className="admin-usermanage-user-info">
                          <div className="admin-usermanage-user-name">{getFullName(u)}</div>
                          <div className="admin-usermanage-user-email">{u.email || "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="admin-usermanage-td">
                      <span className={`admin-usermanage-pill ${getRoleClass(u.role)}`}>
                        {formatRole(u.role)}
                      </span>
                    </td>
                    <td className="admin-usermanage-td">
                      <span
                        className={`admin-usermanage-pill ${
                          (u.status || deriveStatus(u)) === "Suspended"
                            ? "admin-usermanage-status-bad"
                            : "admin-usermanage-status-ok"
                        }`}
                      >
                        {u.status || deriveStatus(u)}
                      </span>
                    </td>
                    <td className="admin-usermanage-td admin-usermanage-num">{u.courses ?? 0}</td>
                    <td className="admin-usermanage-td admin-usermanage-num">
                      <span className={u.violations > 0 ? "admin-usermanage-bad-text" : "admin-usermanage-ok-text"}>
                        {u.violations ?? 0}
                      </span>
                    </td>
                    <td className="admin-usermanage-td">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="admin-usermanage-td admin-usermanage-actions">
                      <button
                        className={
                          (u.status || deriveStatus(u)) === "Suspended"
                            ? "admin-usermanage-btn-success"
                            : "admin-usermanage-btn-danger"
                        }
                        onClick={() => handleToggle(u)}
                      >
                        {(u.status || deriveStatus(u)) === "Suspended" ? "Activate" : "Suspend"}
                      </button>
                    </td>
                  </tr>
                ))}
                {!rows.length && !loading && (
                  <tr>
                    <td colSpan={7} className="admin-usermanage-empty">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="admin-usermanage-foot">
            <div className="admin-usermanage-total">Total: {total}</div>
            <div className="admin-usermanage-pager">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="admin-usermanage-pager-btn"
              >
                Prev
              </button>
              <span className="admin-usermanage-page-info">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="admin-usermanage-pager-btn"
              >
                Next
              </button>
            </div>
          </div>

          {loading && <div className="admin-usermanage-loading">Loading…</div>}
        </div>
      </div>
    </div>
  );
}
