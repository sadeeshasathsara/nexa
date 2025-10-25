// components/admin.components/admin.sidebar.jsx
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/global.assets/logo1.png";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  const isSettingsActive = location.pathname.startsWith("/v1/admin/settings");

  const handleProfileClick = () => {
    // Navigate to profile section in settings
    navigate("/v1/admin/settings#profile");
  };

  const handleLogout = async () => {
    try {
      // Clear admin authentication data
      localStorage.removeItem("nexa_admin_token");
      localStorage.removeItem("nexa_admin_profile");
      sessionStorage.clear();
      
      // Optional: Call logout API if you have one
      // const API = import.meta.env.VITE_API_HOST || "http://localhost:5000";
      // await fetch(`${API}/api/v1/admin/auth/logout`, {
      //   method: "POST",
      //   credentials: "include",
      // });
      
      // Redirect to login page
      navigate("/v1/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if API call fails
      navigate("/v1/admin/login", { replace: true });
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-inner">
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-wrap">
            <img src={logo} alt="Nexa logo" className="logo-img" />
            <div className="logo-text">Nexa Admin</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="section-label">Navigation</div>
            <div className="nav-list">
              <NavLink to="/v1/admin/dashboard" className={linkClass} end>
                <i className="bx bx-bar-chart-alt"></i>
                <span className="nav-text">Dashboard</span>
              </NavLink>

              <NavLink to="/v1/admin/analytics" className={linkClass}>
                <i className="bx bx-bar-chart-alt-2"></i>
                <span className="nav-text">Analytics</span>
              </NavLink>

              <NavLink to="/v1/admin/approvals" className={linkClass}>
                <i className="bx bx-check-shield"></i>
                <span className="nav-text">Approvals</span>
              </NavLink>

              <NavLink to="/v1/admin/usermanage" className={linkClass}>
                <i className="bx bx-user-circle"></i>
                <span className="nav-text">User Management</span>
              </NavLink>

              <NavLink to="/v1/admin/settings" className={linkClass}>
                <i className="bx bx-cog"></i>
                <span className="nav-text">Settings</span>
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Footer - Fixed at bottom */}
        <div className="sidebar-footer">
          {/* User Profile */}
          <div className="user-profile" onClick={handleProfileClick} style={{cursor: 'pointer'}}>
            <div className="user-avatar">AD</div>
            <div className="user-info">
              <div className="user-name">Admin User</div>
              <div className="user-role">Super Admin</div>
            </div>
            <i className="bx bx-chevron-right profile-arrow"></i>
          </div>

          {/* Logout Button - Always at very bottom */}
          <div className="logout-section">
            <button 
              type="button" 
              className="nav-link logout" 
              onClick={handleLogout}
            >
              <i className="bx bx-log-out"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
