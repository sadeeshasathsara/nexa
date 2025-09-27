import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/global.assets/logo3.png";


export default function AdminSidebar() {

  const navigate = useNavigate();

  const onLogout = () => {
    try {
      localStorage.removeItem("nexa_admin_token");
      sessionStorage.clear();
    } catch {

    }
    navigate ("../../admin/login", {replace: true });
    };


  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="logo-wrap">
            <img src={logo} alt="Nexa logo" className="logo-img"/>
            <div className="logo-text">Nexa Admin</div>
          </div>
          <div className="sidebar-title">Admin Dashboard</div>
        
        <nav className="nav-list">
        <NavLink to="/v1/admin/dashboard" className={linkClass} end>
          <i className="bx bx-bar-chart-alt"></i>
          <span>Dashboard</span>    
        </NavLink>

        <NavLink to="/v1/admin/dashboard" className={linkClass}>
          <i className="bx bx-bar-chart-alt-2"></i>
          <span>Reports</span> 
        </NavLink>
        <NavLink to="/v1/admin/settings" className={linkClass}>
          <i className="bx bx-cog"></i>
          <span>Settings</span> 
        </NavLink>
        </nav>

        <div className="sidebar-spacer"/>
          <button type="button" className="nav-link logout" onClick={onLogout}>
            <i className="bx bx-log-out"></i>
            <span>Logout</span>
          </button>
      </div>
    </aside>
  );
}
