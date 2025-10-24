import { useEffect, useState } from "react";
import "../../assets/admin.assets/admin.approvals.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { getPending, getApproved, decideTutor } from "../../apis/admin.apis/admin.approvals.api";

function niceName(it) {
  return `${it.firstName || ""} ${it.lastName || ""}`.trim() || "(no name)";
}

function niceDate(s) {
  if (!s) return "-";
  const d = new Date(s);
  return isNaN(d.getTime()) ? "-" : d.toLocaleString();
}

export default function AdminApprovalsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [approved, setApproved] = useState([]);
  const [loadingApproved, setLoadingApproved] = useState(false);
  const [errApproved, setErrApproved] = useState("");
  const [actingId, setActingId] = useState(null);

  async function loadPending() {
    setErr("");
    setLoading(true);
    try {
      const data = await getPending();
      setItems(data);
    } catch (e) {
      setErr(e.message || "Failed to load pending tutors");
    } finally {
      setLoading(false);
    }
  }

  async function loadApproved() {
    setErrApproved("");
    setLoadingApproved(true);
    try {
      const data = await getApproved();
      setApproved(data || []);
    } catch (e) {
      setErrApproved(e.message || "Failed to load approved tutors");
    } finally {
      setLoadingApproved(false);
    }
  }

  useEffect(() => {
    loadPending();
    loadApproved();
  }, []);

  async function onDecision(id, action) {
    if (!id) return alert("Tutor ID missing.");
    if (actingId) return;
    setActingId(id);
    try {
      let reason = "";
      if (action === "reject") {
        reason = window.prompt("Provide a reason for rejection (optional):", "") || "";
      }
      await decideTutor({ id, action, reason });
      setItems((prev) => prev.filter((x) => x._id !== id));
      await loadApproved();
      alert(`${action === "approve" ? "Approved" : "Rejected"} successfully!`);
    } catch (e) {
      alert(e.message || "Action failed");
    } finally {
      setActingId(null);
    }
  }

  const empty = !loading && items.length === 0;
  const approvedEmpty = !loadingApproved && approved.length === 0;

  return (
    <div className="admin-layout">
      <AdminHeader />
      <AdminSidebar />
      
      <main className="admin-main-content">
        <div className="content-header">
          <div className="header-info">
            <h1 className="page-title">Tutor Approvals</h1>
            <p className="page-subtitle">
              Review and manage pending tutor registrations.
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-value">{items.length}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{approved.length}</div>
              <div className="stat-label">Approved</div>
            </div>
          </div>
        </div>

        <div className="content-body">
          {err && <div className="alert alert-error"><i className="bx bx-error-circle"></i><span>{err}</span></div>}
          {loading && (
            <div className="loading-card">
              <i className="bx bx-loader-circle bx-spin"></i>
              <span>Loading pending tutors…</span>
            </div>
          )}

          {empty && !loading && (
            <div className="empty-state-card">
              <i className="bx bx-party"></i>
              <h3>No pending tutors</h3>
              <p>All caught up! 🎉</p>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Pending Tutor Applications</h3>
                <div className="card-actions">
                  <button className="btn btn-secondary btn-sm" onClick={loadPending}>
                    <i className="bx bx-refresh"></i> Refresh
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, i) => (
                      <tr key={it._id} className={actingId === it._id ? "row-disabled" : ""}>
                        <td>{i + 1}</td>
                        <td>{niceName(it)}</td>
                        <td>{it.email}</td>
                        <td>{niceDate(it.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => onDecision(it._id, "approve")}
                              disabled={actingId === it._id}
                            >
                              {actingId === it._id ? (
                                <>
                                  <i className="bx bx-loader-circle bx-spin"></i> Processing…
                                </>
                              ) : (
                                <>
                                  <i className="bx bx-check"></i> Approve
                                </>
                              )}
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => onDecision(it._id, "reject")}
                              disabled={actingId === it._id}
                            >
                              <i className="bx bx-x"></i> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loadingApproved && approved.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Approved Tutors</h3>
                <div className="card-actions">
                  <button className="btn btn-secondary btn-sm" onClick={loadApproved}>
                    <i className="bx bx-refresh"></i> Refresh
                  </button>
                </div>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Subjects</th>
                      <th>Grades</th>
                      <th>Approved Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.map((it, i) => (
                      <tr key={it._id}>
                        <td>{i + 1}</td>
                        <td>{niceName(it)}</td>
                        <td>{it.email}</td>
                        <td>{it.details?.phoneNumber || "-"}</td>
                        <td>{it.details?.subjects?.join(", ") || "-"}</td>
                        <td>{it.details?.preferredGradeLevels?.join(", ") || "-"}</td>
                        <td>{niceDate(it.approvedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
