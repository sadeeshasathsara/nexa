import { useEffect, useState } from "react";
import "../../assets/admin.assets/admin.approvals.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { getPending, decideByEmail, getApproved } from "../../apis/admin.apis/admin.approvals.api";

function niceName(it) {
  return it?.name || it?.fullName || it?.institutionName || "(no name)";
}

function niceDate(s) {
  if (!s) return "-";
  const d = new Date(s);
  return isNaN(d.getTime()) ? "-" : d.toLocaleString();
}

export default function AdminApprovalsPage() {
  const [type, setType] = useState("tutor");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [approved, setApproved] = useState([]);
  const [loadingApproved, setLoadingApproved] = useState(false);
  const [errApproved, setErrApproved] = useState("");
  const [actingEmail, setActingEmail] = useState(null);

  async function loadPending() {
    setErr("");
    setLoading(true);
    try {
      const data = await getPending(type);
      setItems(data);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load pending list");
    } finally {
      setLoading(false);
    }
  }

  async function loadApproved() {
    setErrApproved("");
    setLoadingApproved(true);
    try {
      const data = await getApproved(type);
      setApproved(data || []);
    } catch (e) {
      setErrApproved(e?.response?.data?.message || "Failed to load approved list");
    } finally {
      setLoadingApproved(false);
    }
  }

  useEffect(() => {
    loadPending();
    loadApproved();
  }, [type]);

  async function onDecision(email, action) {
    if (!email) return alert("No email found for this item.");
    if (actingEmail) return;
    setActingEmail(email);
    try {
      let reason;
      if (action === "reject") {
        reason = window.prompt("Optional: Provide a reason for rejection (or leave empty)", "");
      }
      await decideByEmail({ type, email, action, reason });
      setItems((prev) =>
        prev.filter((x) => (x.email || "").toLowerCase() !== (email || "").toLowerCase())
      );
      if (action === "approve") {
        try {
          await loadApproved();
        } catch {
          // already updated the list
        }
      }
      alert(`${action === "approve" ? "Approved" : "Rejected"}: ${email}`);
    } catch (e) {
      alert(e?.response?.data?.message || "Action failed");
    } finally {
      setActingEmail(null);
    }
  }

  const empty = !loading && items.length === 0;
  const approvedEmpty = !loadingApproved && approved.length === 0;

  return (
    <div className="admin-layout">
      <AdminHeader />
      <AdminSidebar />
      
      <main className="admin-main-content">
        {/* Header Section */}
        <div className="content-header">
          <div className="header-info">
            <h1 className="page-title">Tutor Approvals</h1>
            <p className="page-subtitle">
              Review and manage pending tutor applications
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
          {/* Error / loading / empty */}
          {err && (
            <div className="alert alert-error">
              <i className="bx bx-error-circle"></i>
              <span>{err}</span>
            </div>
          )}
          
          {loading && (
            <div className="loading-card">
              <i className="bx bx-loader-circle bx-spin"></i>
              <span>Loading pending applications…</span>
            </div>
          )}
          
          {empty && !loading && (
            <div className="empty-state-card">
              <i className="bx bx-party"></i>
              <h3>No pending tutors</h3>
              <p>All caught up! 🎉 No pending tutor applications at the moment.</p>
            </div>
          )}

          {/* Pending Table */}
          {!loading && items.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  Pending Tutor Applications
                </h3>
                <div className="card-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={loadPending}
                  >
                    <i className="bx bx-refresh"></i>
                    Refresh
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tutor Information</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, i) => (
                      <tr key={(it._id || it.id || i).toString()} className={actingEmail === it.email ? "row-disabled" : ""}>
                        <td className="text-center">{i + 1}</td>
                        <td>
                          <div className="user-info">
                            <div className="user-name">{niceName(it)}</div>
                            <div className="user-email">{it.email || "-"}</div>
                            {it.qualifications && (
                              <div className="user-qualifications">
                                {it.qualifications}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge status-${it.status || "pending"}`}>
                            {(it.status || "pending").replace(/^\w/, (c) => c.toUpperCase())}
                          </span>
                        </td>
                        <td>{niceDate(it.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => onDecision(it.email, "approve")}
                              disabled={actingEmail === it.email}
                            >
                              {actingEmail === it.email ? (
                                <>
                                  <i className="bx bx-loader-circle bx-spin"></i>
                                  Processing
                                </>
                              ) : (
                                <>
                                  <i className="bx bx-check"></i>
                                  Approve
                                </>
                              )}
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => onDecision(it.email, "reject")}
                              disabled={actingEmail === it.email}
                            >
                              {actingEmail === it.email ? (
                                <>
                                  <i className="bx bx-loader-circle bx-spin"></i>
                                  Processing
                                </>
                              ) : (
                                <>
                                  <i className="bx bx-x"></i>
                                  Reject
                                </>
                              )}
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

          {/* Approved Section */}
          {errApproved && (
            <div className="alert alert-warning">
              <i className="bx bx-error-alt"></i>
              <span>{errApproved}</span>
            </div>
          )}
          
          {loadingApproved && (
            <div className="loading-card">
              <i className="bx bx-loader-circle bx-spin"></i>
              <span>Loading approved tutors…</span>
            </div>
          )}
          
          {approvedEmpty && !loadingApproved && (
            <div className="empty-state-card">
              <i className="bx bx-user-check"></i>
              <h3>No approved tutors</h3>
              <p>Approved tutors will appear here once you start approving applications.</p>
            </div>
          )}

          {!loadingApproved && approved.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  Approved Tutors
                </h3>
                <div className="card-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={loadApproved}
                  >
                    <i className="bx bx-refresh"></i>
                    Refresh
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tutor Information</th>
                      <th>Status</th>
                      <th>Approved Date</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.map((it, i) => (
                      <tr key={(it._id || it.id || `a-${i}`).toString()}>
                        <td className="text-center">{i + 1}</td>
                        <td>
                          <div className="user-info">
                            <div className="user-name">{niceName(it)}</div>
                            <div className="user-email">{it.email || "-"}</div>
                            {it.qualifications && (
                              <div className="user-qualifications">
                                {it.qualifications}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge status-${it.status || "active"}`}>
                            {(it.status || "active").replace(/^\w/, (c) => c.toUpperCase())}
                          </span>
                        </td>
                        <td>{niceDate(it.approvedAt)}</td>
                        <td>
                          <code className="id-badge">
                            {(it._id || it.id || "-").toString().slice(-8)}
                          </code>
                        </td>
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
