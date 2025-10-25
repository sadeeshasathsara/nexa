// src/components/admin.components/admin.header.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* NEW: approvals APIs to index tutor names */
import { getPending, getApproved } from "../../apis/admin.apis/admin.approvals.api";

export default function AdminHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // dynamic search index
  const [index, setIndex] = useState([
    { id: "pg-dashboard", type: "dashboard", title: "Dashboard Overview", path: "/v1/admin/dashboard", category: "Pages" },
    { id: "pg-analytics", type: "analytics", title: "Reports & Analytics", path: "/v1/admin/analytics", category: "Pages" },
    { id: "pg-approvals", type: "approvals", title: "Tutor Approvals", path: "/v1/admin/approvals", category: "Approvals" },
    // report shortcuts
    { id: "rp-quiz", type: "report", title: "Report · Quiz Attempts", path: "/v1/admin/analytics#quiz", category: "Reports" },
    { id: "rp-donations", type: "report", title: "Report · Donations", path: "/v1/admin/analytics#donations", category: "Reports" },
    { id: "rp-courses", type: "report", title: "Report · Courses", path: "/v1/admin/analytics#courses", category: "Reports" },
  ]);

  // Load tutors for search suggestions
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [pending, approved] = await Promise.all([getPending(), getApproved(200)]);
        const tutors = [
          ...(pending || []).map(t => ({ id: `tutor-p-${t._id}`, type: "tutor", title: `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim() || "Tutor", path: "/v1/admin/approvals", category: "Tutors · Pending" })),
          ...(approved || []).map(t => ({ id: `tutor-a-${t._id}`, type: "tutor", title: `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim() || "Tutor", path: "/v1/admin/approvals", category: "Tutors · Approved" })),
        ];
        if (!cancelled) setIndex(prev => [...prev, ...tutors]);
      } catch (e) {
        // ignore silently
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // time & click away
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const clickAway = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) setShowNotifications(false);
      if (messagesRef.current && !messagesRef.current.contains(e.target)) setShowMessages(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", clickAway);
    return () => { clearInterval(timer); document.removeEventListener("mousedown", clickAway); };
  }, []);

  const formatTime = (d) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const formatDate = (d) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); setShowResults(false); return; }
    const ql = q.toLowerCase();
    const results = index.filter(item =>
      item.title.toLowerCase().includes(ql) ||
      item.category.toLowerCase().includes(ql) ||
      item.type.toLowerCase().includes(ql)
    );
    setSearchResults(results);
    setShowResults(results.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length) {
      navigate(searchResults[0].path);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = (path) => {
    navigate(path);
    setShowResults(false);
    setSearchQuery("");
  };

  // Mock notifications/messages kept as is …

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="search-bar-container" ref={searchRef}>
          <i className="bx bx-search search-icon"></i>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search tutors, reports, pages…"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
            />
          </form>

          {showResults && (
            <div className="search-results">
              {searchResults.length ? (
                <>
                  <div className="search-results-header">
                    <span>Results</span>
                    <span className="results-count">{searchResults.length}</span>
                  </div>
                  <div className="search-results-list">
                    {searchResults.slice(0, 8).map((r) => (
                      <div key={r.id} className="search-result-item" onClick={() => handleResultClick(r.path)}>
                        <i className={`bx ${r.type === "tutor" ? "bx-user" : r.type === "report" ? "bx-bar-chart-alt-2" : "bx-file"} result-icon`}></i>
                        <div className="result-content">
                          <div className="result-title">{r.title}</div>
                          <div className="result-category">{r.category}</div>
                        </div>
                        <i className="bx bx-chevron-right result-arrow"></i>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-results">
                  <i className="bx bx-search-alt no-results-icon"></i>
                  <div className="no-results-text">
                    <div className="no-results-title">No results</div>
                    <div className="no-results-description">Try another keyword</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right side (time, notifications, messages, profile) – keep your existing implementation */}
      <div className="header-right">
        <div className="time-display">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
        {/* … your existing notifications/messages/profile markup (unchanged) … */}
      </div>
    </header>
  );
}
