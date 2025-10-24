import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/admin.assets/admin.NotiMessage.css";

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      icon: 'bx bx-user-plus',
      title: 'New Tutor Applications',
      message: '5 pending tutor approvals waiting for review',
      time: '5 min ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      icon: 'bx bx-server',
      title: 'System Backup',
      message: 'Daily system backup completed successfully',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      icon: 'bx bx-user',
      title: 'New Registration',
      message: 'John Doe registered as a new student',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'info',
      icon: 'bx bx-credit-card',
      title: 'Payment Processed',
      message: 'Payment of $150.00 has been processed successfully',
      time: '3 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'warning',
      icon: 'bx bx-error',
      title: 'System Warning',
      message: 'High server load detected on database server',
      time: '5 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: 6,
      type: 'success',
      icon: 'bx bx-check-circle',
      title: 'Profile Updated',
      message: 'Your admin profile has been updated successfully',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return notification.priority === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(notificationId => notificationId !== id)
        : [...prev, id]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#007AFF';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'warning': return 'bx bx-error-circle';
      case 'error': return 'bx bx-x-circle';
      case 'success': return 'bx bx-check-circle';
      case 'info':
      default: return 'bx bx-info-circle';
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Notifications</h1>
          <p>Manage and review your system notifications</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <i className="bx bx-check-double"></i>
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">
              <i className="bx bx-bell"></i>
            </div>
            <div className="stat-info">
              <h3>{notifications.length}</h3>
              <p>Total Notifications</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">
              <i className="bx bx-error"></i>
            </div>
            <div className="stat-info">
              <h3>{unreadCount}</h3>
              <p>Unread</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card">
              <div className="stat-icon success">
                <i className="bx bx-check-circle"></i>
              </div>
              <div className="stat-info">
                <h3>{notifications.filter(n => n.priority === 'high').length}</h3>
                <p>High Priority</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-tabs">
            {['all', 'unread', 'read', 'high', 'medium', 'low'].map(tab => (
              <button
                key={tab}
                className={`filter-tab ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <i className="bx bx-bell-off"></i>
              <h3>No notifications found</h3>
              <p>You're all caught up! There are no {filter !== 'all' ? filter : ''} notifications.</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-card ${notification.read ? 'read' : 'unread'}`}
              >
                <div className="notification-select">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelectNotification(notification.id)}
                  />
                </div>
                <div className="notification-icon">
                  <div 
                    className="icon-wrapper"
                    style={{ backgroundColor: `${getPriorityColor(notification.priority)}15` }}
                  >
                    <i 
                      className={getTypeIcon(notification.type)}
                      style={{ color: getPriorityColor(notification.priority) }}
                    ></i>
                  </div>
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-meta">
                    <span 
                      className="priority-badge"
                      style={{ 
                        backgroundColor: getPriorityColor(notification.priority),
                        color: 'white'
                      }}
                    >
                      {notification.priority}
                    </span>
                  </div>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      className="icon-btn small"
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <i className="bx bx-check"></i>
                    </button>
                  )}
                  <button
                    className="icon-btn small danger"
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete notification"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}