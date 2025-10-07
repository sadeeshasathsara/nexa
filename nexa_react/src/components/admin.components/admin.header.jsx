import { useState, useEffect } from "react";
import "../../assets/admin.assets/admin.header.css";

export default function AdminHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load admin profile
    try {
      const adminProfile = localStorage.getItem("nexa_admin_profile");
      if (adminProfile) {
        setProfile(JSON.parse(adminProfile));
      }
    } catch {
      // Handle error silently
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-bar"
          />
          <i className="bx bx-search search-icon"></i>
        </div>
      </div>
      
      <div className="header-right">
        <div className="time-display">
          {currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </div>
        
        <div className="notifications">
          <button className="icon-btn">
            <i className="bx bx-bell"></i>
          </button>
        </div>
        
        <div className="admin-profile">
          <div className="profile-avatar">
            {profile?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="profile-info">
            <div className="profile-name">{profile?.name || 'Admin User'}</div>
            <div className="profile-role">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}