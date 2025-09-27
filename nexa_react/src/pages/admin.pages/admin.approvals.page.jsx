import { useEffect, useState } from "react";
import "../../assets/admin.assets/admin.dashboard.css";
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
  const [type, setType] = useState("tutor"); // "tutor" | "institution"
  //Pending
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  //Approved
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
    setApproved(" ");
    setLoadingApproved(true);
    try {
      // Pass no limit to get full list, or pass a number e.g., 20 if your API supports it
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
      //Update list locally
      setItems((prev) =>
        prev.filter((x) => (x.email || "").toLowerCase() !== (email || "").toLowerCase())
      );
      //if Approved, refresh and show in the approved list
      if (action === "approve"){
        try {
          await loadApproved();
        }catch {
          //already updated the list
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
    <div className="admin-shell">
      <AdminHeader />
      <AdminSidebar />

      {/* Main content area */}
      <main className="main">
        <h1 className="page-title">Approvals</h1>
        <p className="page-sub">
          Approve or reject pending {type === "tutor" ? "tutor" : "institution"} accounts.
        </p>

        {/* Type Switch as buttons using existing .btn class */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button
            className="btn"
            style={{
              borderColor: type === "tutor" ? "var(--blue)" : "var(--line)",
              color: type === "tutor" ? "var(--blue)" : "inherit",
            }}
            onClick={() => setType("tutor")}
          >
            Tutors
          </button>
          <button
            className="btn"
            style={{
              borderColor: type === "institution" ? "var(--blue)" : "var(--line)",
              color: type === "institution" ? "var(--blue)" : "inherit",
            }}
            onClick={() => setType("institution")}
          >
            Institutions
          </button>
        </div>

        {/* Error / loading / empty */}
        {err && <div className="card" style={{ padding: 16, marginBottom: 16 }}>{err}</div>}
        {loading && <div className="card" style={{ padding: 16, marginBottom: 16 }}>Loading…</div>}
        {empty && !loading && (
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            No pending {type}s 🎉
          </div>
        )}

        {/* Table using your table classes */}
        {!loading && items.length > 0 && (
          <section className="table-wrap">
            <div className="table-head">
              <h3 className="card-title">
                Pending {type === "tutor" ? "Tutors" : "Institutions"}
              </h3>
              <div className="table-controls" />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name / Email</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={(it._id || it.id || i).toString()}>
                    <td>{i + 1}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{niceName(it)}</div>
                      <div style={{ color: "var(--muted)", fontSize: 12 }}>
                        {it.email || "-"}
                      </div>
                    </td>
                    <td>
                      <span className={`status ${it.status || "pending"}`}>
                        {(it.status || "pending").replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                    </td>
                    <td>{niceDate(it.createdAt)}</td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          className="btn btn-approve"
                          onClick={() => onDecision(it.email, "approve")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-reject"
                          onClick={() => onDecision(it.email, "reject")}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>   
        )}

        {/* Approved Section */}
        {errApproved && <div className="card" style={{ padding: 16, marginBottom: 16 }}>{errApproved}</div>}
        {loadingApproved && <div className="card" style={{ padding: 16, marginBottom: 16 }}>Loading approved…</div>}
        {approvedEmpty && !loadingApproved && (
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            No approved {type}s found.
          </div>
        )}

        {!loadingApproved && approved.length > 0 && (
          <section className="table-wrap">
            <div className="table-head">
              <h3 className="card-title">
                Approved {type === "tutor" ? "Tutors" : "Institutions"}
              </h3>
              <div className="table-controls" />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name / Email</th>
                  <th>Status</th>
                  <th>Approved On</th>
                </tr>
              </thead>
              <tbody>
                {approved.map((it, i) => (
                  <tr key={(it._id || it.id || `a-${i}`).toString()}>
                    <td>{i + 1}</td>
                    <td style={{ fontFamily: "monospace" }}>{(it._id || it.id || "-").toString()}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{niceName(it)}</div>
                      <div style={{ color: "var(--muted)", fontSize: 12 }}>
                        {it.email || "-"}
                      </div>
                    </td>
                    <td>
                      <span className={`status ${it.status || "active"}`}>
                        {(it.status || "active").replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                    </td>
                    <td>{niceDate(it.approvedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </section>
        )}
      </main>
    </div>
    
  );
}
