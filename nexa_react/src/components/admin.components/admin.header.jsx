// src/components/admin.components/admin.header.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'warning', 
      icon: 'bx bx-user-plus',
      title: 'New Tutor Applications', 
      message: '5 pending tutor approvals waiting for review', 
      time: '5 min ago', 
      read: false,
      path: '/v1/admin/approvals'
    },
    { 
      id: 2, 
      type: 'info', 
      icon: 'bx bx-server',
      title: 'System Backup', 
      message: 'Daily system backup completed successfully', 
      time: '1 hour ago', 
      read: false,
      path: '/v1/admin/dashboard'
    },
    { 
      id: 3, 
      type: 'success', 
      icon: 'bx bx-user',
      title: 'New Registration', 
      message: 'John Doe registered as a new student', 
      time: '2 hours ago', 
      read: true,
      path: '/v1/admin/users'
    }
  ]);

  // Mock messages data
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: 'Support Team', 
      avatar: 'ST',
      subject: 'Scheduled Maintenance', 
      preview: 'System maintenance scheduled for tonight at 2 AM...', 
      time: '30 min ago', 
      unread: true,
      path: '/v1/admin/settings'
    },
    { 
      id: 2, 
      from: 'John Smith', 
      avatar: 'JS',
      subject: 'Account Issue', 
      preview: 'Having trouble accessing my tutor dashboard...', 
      time: '1 hour ago', 
      unread: true,
      path: '/v1/admin/users'
    }
  ]);

  // Mock search data
  const searchableData = [
    { id: 1, type: 'dashboard', title: 'Dashboard Overview', path: '/v1/admin/dashboard', category: 'Pages' },
    { id: 2, type: 'analytics', title: 'User Analytics', path: '/v1/admin/analytics', category: 'Pages' },
    { id: 3, type: 'approvals', title: 'Pending Tutor Approvals', path: '/v1/admin/approvals', category: 'Approvals' },
    { id: 4, type: 'settings', title: 'Profile Settings', path: '/v1/admin/settings#profile', category: 'Settings' },
    { id: 5, type: 'settings', title: 'Security Settings', path: '/v1/admin/settings#security', category: 'Settings' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filteredResults = searchableData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
    setShowResults(filteredResults.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
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

  // Notifications functionality
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    setShowMessages(false);
    setShowProfileMenu(false);
    
    // Mark all as read when opening
    if (!showNotifications) {
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    }
  };

  const handleNotificationClick = (notification) => {
    navigate(notification.path);
    setShowNotifications(false);
  };

  // Messages functionality
  const unreadMessagesCount = messages.filter(m => m.unread).length;

  const handleMessagesClick = () => {
    setShowMessages(!showMessages);
    setShowNotifications(false);
    setShowProfileMenu(false);
    
    // Mark all as read when opening
    if (!showMessages) {
      setMessages(messages.map(msg => ({ ...msg, unread: false })));
    }
  };

  const handleMessageClick = (message) => {
    navigate(message.path);
    setShowMessages(false);
  };

  // Profile functionality
  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
    setShowMessages(false);
  };

  const handleProfileAction = (action) => {
    setShowProfileMenu(false);
    switch (action) {
      case 'profile':
        navigate('/v1/admin/settings#profile');
        break;
      case 'settings':
        navigate('/v1/admin/settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("nexa_admin_token");
      localStorage.removeItem("nexa_admin_profile");
      sessionStorage.clear();
      navigate("/v1/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/v1/admin/login", { replace: true });
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'dashboard':
        return 'bx bx-bar-chart-alt';
      case 'analytics':
        return 'bx bx-bar-chart-alt-2';
      case 'approvals':
        return 'bx bx-check-shield';
      case 'settings':
        return 'bx bx-cog';
      case 'user':
        return 'bx bx-user';
      default:
        return 'bx bx-file';
    }
  };

  const getNotificationIconColor = (type) => {
    switch (type) {
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <header className="admin-header">
      {/* Header Left - Search */}
      <div className="header-left">
        <div className="search-bar-container" ref={searchRef}>
          <i className="bx bx-search search-icon"></i>
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Search dashboard, reports, settings..." 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
            />
          </form>
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              <div className="search-results-header">
                <span>Search Results</span>
                <span className="results-count">{searchResults.length} found</span>
              </div>
              <div className="search-results-list">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(result.path)}
                  >
                    <i className={`${getIconForType(result.type)} result-icon`}></i>
                    <div className="result-content">
                      <div className="result-title">{result.title}</div>
                      <div className="result-category">{result.category}</div>
                    </div>
                    <i className="bx bx-chevron-right result-arrow"></i>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showResults && searchQuery && searchResults.length === 0 && (
            <div className="search-results">
              <div className="no-results">
                <i className="bx bx-search-alt no-results-icon"></i>
                <div className="no-results-text">
                  <div className="no-results-title">No results found</div>
                  <div className="no-results-description">
                    Try searching with different keywords
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header Right */}
      <div className="header-right">
        {/* Time Display */}
        <div className="time-display">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>

        {/* Notifications */}
        <div className="notifications" ref={notificationsRef}>
          <button className="icon-btn compact" onClick={handleNotificationsClick}>
            <i className="bx bx-bell"></i>
            {unreadNotificationsCount > 0 && (
              <span className="notification-badge">{unreadNotificationsCount}</span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="dropdown-menu notifications-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <span className="dropdown-count">{notifications.length} total</span>
              </div>
              
              <div className="dropdown-content">
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className={`notification-icon ${getNotificationIconColor(notification.type)}`}>
                      <i className={notification.icon}></i>
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-time">{notification.time}</div>
                    </div>
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
              
              <div className="dropdown-footer">
                <button className="view-all-btn" onClick={() => navigate('/v1/admin/notifications')}>
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="messages" ref={messagesRef}>
          <button className="icon-btn compact" onClick={handleMessagesClick}>
            <i className="bx bx-envelope"></i>
            {unreadMessagesCount > 0 && (
              <span className="notification-badge">{unreadMessagesCount}</span>
            )}
          </button>
          
          {/* Messages Dropdown */}
          {showMessages && (
            <div className="dropdown-menu messages-dropdown">
              <div className="dropdown-header">
                <h3>Messages</h3>
                <span className="dropdown-count">{messages.length} total</span>
              </div>
              
              <div className="dropdown-content">
                {messages.slice(0, 4).map((message) => (
                  <div
                    key={message.id}
                    className={`message-item ${message.unread ? 'unread' : 'read'}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="message-avatar">
                      {message.avatar}
                    </div>
                    <div className="message-content">
                      <div className="message-sender">{message.from}</div>
                      <div className="message-subject">{message.subject}</div>
                      <div className="message-preview">{message.preview}</div>
                      <div className="message-time">{message.time}</div>
                    </div>
                    {message.unread && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
              
              <div className="dropdown-footer">
                <button className="view-all-btn" onClick={() => navigate('/v1/admin/messages')}>
                  View All Messages
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Icon-Only Admin Profile */}
        <div className="admin-profile-icon" ref={profileRef}>
          <button className="icon-btn profile-icon-btn" onClick={handleProfileClick}>
            <div className="profile-avatar-small">AD</div>
          </button>
          
          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown">
              <div className="dropdown-content">
                <div className="profile-dropdown-header">
                  <div className="profile-avatar-medium">AD</div>
                  <div className="profile-info-compact">
                    <div className="profile-name">Admin User</div>
                    <div className="profile-role">Super Admin</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={() => handleProfileAction('profile')}
                >
                  <i className="bx bx-user"></i>
                  <span>My Profile</span>
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => handleProfileAction('settings')}
                >
                  <i className="bx bx-cog"></i>
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item logout"
                  onClick={() => handleProfileAction('logout')}
                >
                  <i className="bx bx-log-out"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
