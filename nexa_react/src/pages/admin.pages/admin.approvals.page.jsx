import { useEffect, useState } from "react";
import "../../assets/admin.assets/admin.dashboard.css";
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
  return isNaN(d.getTime()) ? "-" : d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function AdminApprovalsPage() {
  const [type, setType] = useState("tutor"); // "tutor" | "institution"
  // Pending
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  // Approved
  const [approved, setApproved] = useState([]);
  const [loadingApproved, setLoadingApproved] = useState(false);
  const [errApproved, setErrApproved] = useState("");

  const [actingEmail, setActingEmail] = useState(null); // avoid double actions

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

  async function loadApproved(){
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
        if (reason === null) return; // User cancelled
      }
      await decideByEmail({ type, email, action, reason });
      // Update list locally
      setItems((prev) =>
        prev.filter((x) => (x.email || "").toLowerCase() !== (email || "").toLowerCase())
      );
      // If Approved, refresh and show in the approved list
      if (action === "approve"){
        try {
          await loadApproved();
        } catch {
          // already updated the list
        }
      }

      alert(`${action === "approve" ? "Approved" : "Rejected"}: ${email}`);
    } catch (e) {
      alert(e?.response?.data?.message || "Action failed");
    } finally{
      setActingEmail(null);
    }
  }

  const empty = !loading && items.length === 0;
  const approvedEmpty = !loadingApproved && approved.length === 0;

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <AdminSidebar />

      <main className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="welcome-title">Account Approvals</h1>
            <p className="welcome-subtitle">
              Review and manage pending {type === "tutor" ? "tutor" : "institution"} account requests
            </p>
          </div>
          <div className="header-actions">
            <div className="pending-badge">
              <span className="badge-count">{items.length}</span>
              Pending Requests
            </div>
          </div>
        </div>

        {/* Type Switch */}
        <div className="approvals-type-switch">
          <button
            className={`type-btn ${type === "tutor" ? "active" : ""}`}
            onClick={() => setType("tutor")}
          >
            <i className="bx bx-user"></i>
            Tutor Requests
          </button>
          <button
            className={`type-btn ${type === "institution" ? "active" : ""}`}
            onClick={() => setType("institution")}
          >
            <i className="bx bx-building"></i>
            Institution Requests
          </button>
        </div>

        {/* Error States */}
        {err && (
          <div className="error-card">
            <i className="bx bx-error-circle"></i>
            {err}
          </div>
        )}

        {errApproved && (
          <div className="error-card">
            <i className="bx bx-error-circle"></i>
            {errApproved}
          </div>
        )}

        {/* Loading States */}
        {loading && (
          <div className="loading-card">
            <div className="loading-spinner"></div>
            Loading pending requests...
          </div>
        )}

        {loadingApproved && (
          <div className="loading-card">
            <div className="loading-spinner"></div>
            Loading approved list...
          </div>
        )}

        <div className="approvals-content">
          {/* Pending Section */}
          <section className="approvals-section">
            <div className="section-header">
              <h2 className="section-title">
                Pending Approval
                {items.length > 0 && <span className="count-badge">{items.length}</span>}
              </h2>
              <p className="section-subtitle">
                Review and take action on new account requests
              </p>
            </div>

            {empty && !loading && (
              <div className="empty-state">
                <i className="bx bx-party"></i>
                <h3>No Pending Requests</h3>
                <p>All {type} requests have been processed! 🎉</p>
              </div>
            )}

            {!loading && items.length > 0 && (
              <div className="requests-grid">
                {items.map((it, i) => (
                  <div key={(it._id || it.id || i).toString()} className="request-card">
                    <div className="request-header">
                      <div className="request-avatar">
                        {type === "tutor" ? "T" : "I"}
                      </div>
                      <div className="request-info">
                        <h3 className="request-name">{niceName(it)}</h3>
                        <p className="request-email">{it.email || "-"}</p>
                      </div>
                      <div className="request-status pending">
                        Pending Review
                      </div>
                    </div>

                    <div className="request-details">
                      <div className="detail-item">
                        <span className="detail-label">Applied:</span>
                        <span className="detail-value">{niceDate(it.createdAt)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value capitalize">{type}</span>
                      </div>
                      {it.subject && (
                        <div className="detail-item">
                          <span className="detail-label">Subject:</span>
                          <span className="detail-value">{it.subject}</span>
                        </div>
                      )}
                    </div>

                    <div className="request-actions">
                      <button
                        className="btn-approve"
                        onClick={() => onDecision(it.email, "approve")}
                        disabled={actingEmail === it.email}
                      >
                        {actingEmail === it.email ? (
                          <div className="loading-spinner small"></div>
                        ) : (
                          <>
                            <i className="bx bx-check"></i>
                            Approve
                          </>
                        )}
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => onDecision(it.email, "reject")}
                        disabled={actingEmail === it.email}
                      >
                        {actingEmail === it.email ? (
                          <div className="loading-spinner small"></div>
                        ) : (
                          <>
                            <i className="bx bx-x"></i>
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Approved Section */}
          <section className="approvals-section">
            <div className="section-header">
              <h2 className="section-title">
                Approved Accounts
                {approved.length > 0 && <span className="count-badge approved">{approved.length}</span>}
              </h2>
              <p className="section-subtitle">
                Previously approved {type} accounts
              </p>
            </div>

            {approvedEmpty && !loadingApproved && (
              <div className="empty-state">
                <i className="bx bx-user-check"></i>
                <h3>No Approved Accounts</h3>
                <p>No {type} accounts have been approved yet.</p>
              </div>
            )}

            {!loadingApproved && approved.length > 0 && (
              <div className="approved-table-container">
                <table className="approved-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Approved Date</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.map((it, i) => (
                      <tr key={(it._id || it.id || `a-${i}`).toString()}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {type === "tutor" ? "T" : "I"}
                            </div>
                            <div className="user-info">
                              <div className="user-name">{niceName(it)}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="email-cell">{it.email || "-"}</div>
                        </td>
                        <td>
                          <span className="status-badge active">
                            Active
                          </span>
                        </td>
                        <td>
                          <div className="date-cell">{niceDate(it.approvedAt)}</div>
                        </td>
                        <td>
                          <div className="id-cell">{(it._id || it.id || "-").toString().slice(-8)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}