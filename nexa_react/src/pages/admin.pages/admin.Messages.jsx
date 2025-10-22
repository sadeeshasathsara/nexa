import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/admin.assets/admin.NotiMessage.css";


export default function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Support Team',
      avatar: 'ST',
      email: 'support@nexa.com',
      subject: 'Scheduled Maintenance',
      preview: 'System maintenance scheduled for tonight at 2 AM. The system will be unavailable for approximately 30 minutes.',
      message: 'Dear Admin,\n\nWe wanted to inform you about the scheduled system maintenance that will take place tonight at 2 AM. During this time, the system will be temporarily unavailable for approximately 30 minutes.\n\nWe apologize for any inconvenience this may cause and appreciate your understanding.\n\nBest regards,\nSupport Team',
      time: '30 min ago',
      unread: true,
      category: 'system'
    },
    {
      id: 2,
      from: 'John Smith',
      avatar: 'JS',
      email: 'john.smith@email.com',
      subject: 'Account Issue',
      preview: 'Having trouble accessing my tutor dashboard. Getting authentication errors when trying to log in.',
      message: 'Hello Admin,\n\nI am experiencing issues accessing my tutor dashboard. When I try to log in, I keep getting authentication errors. I have tried resetting my password but the issue persists.\n\nCould you please look into this?\n\nThank you,\nJohn Smith',
      time: '1 hour ago',
      unread: true,
      category: 'support'
    },
    {
      id: 3,
      from: 'Sarah Johnson',
      avatar: 'SJ',
      email: 'sarah.j@email.com',
      subject: 'Payment Query',
      preview: 'Regarding the payment processed last week, I have not received confirmation.',
      message: 'Dear Admin,\n\nI made a payment last week for the premium subscription but I have not received any confirmation email. The amount has been deducted from my account.\n\nCould you please confirm if the payment was received and activate my premium features?\n\nThanks,\nSarah Johnson',
      time: '3 hours ago',
      unread: false,
      category: 'billing'
    },
    {
      id: 4,
      from: 'IT Department',
      avatar: 'IT',
      email: 'it@nexa.com',
      subject: 'Security Update',
      preview: 'Important security updates have been applied to the system.',
      message: 'Hello Admin,\n\nWe have successfully applied critical security updates to the system. These updates address recently discovered vulnerabilities and enhance overall system security.\n\nNo action is required from your side, but we recommend reviewing the security logs.\n\nIT Department',
      time: '5 hours ago',
      unread: false,
      category: 'system'
    },
    {
      id: 5,
      from: 'Michael Brown',
      avatar: 'MB',
      email: 'm.brown@email.com',
      subject: 'Feature Request',
      preview: 'Would like to request a new feature for the tutor dashboard.',
      message: 'Hi Admin,\n\nI would like to request a new feature for the tutor dashboard. It would be very helpful to have an export functionality for session reports.\n\nCurrently, we can only view reports online but cannot download them for record keeping.\n\nThank you for considering this request.\n\nMichael Brown',
      time: '1 day ago',
      unread: false,
      category: 'feature'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedMessages, setSelectedMessages] = useState([]);

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    if (filter === 'unread') return message.unread;
    if (filter === 'read') return !message.unread;
    return message.category === filter;
  });

  const unreadCount = messages.filter(m => m.unread).length;

  const markAsRead = (id) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, unread: false } : msg
    ));
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, unread: false });
    }
  };

  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, unread: false })));
    if (selectedMessage) {
      setSelectedMessage({ ...selectedMessage, unread: false });
    }
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'system': return '#007AFF';
      case 'support': return '#FF9500';
      case 'billing': return '#34C759';
      case 'feature': return '#AF52DE';
      default: return '#8E8E93';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'system': return 'bx bx-server';
      case 'support': return 'bx bx-support';
      case 'billing': return 'bx bx-credit-card';
      case 'feature': return 'bx bx-bulb';
      default: return 'bx bx-envelope';
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Messages</h1>
          <p>Manage your inbox and communicate with users</p>
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
              <i className="bx bx-envelope"></i>
            </div>
            <div className="stat-info">
              <h3>{messages.length}</h3>
              <p>Total Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">
              <i className="bx bx-message-unread"></i>
            </div>
            <div className="stat-info">
              <h3>{unreadCount}</h3>
              <p>Unread</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">
              <i className="bx bx-user-voice"></i>
            </div>
            <div className="stat-info">
              <h3>{messages.filter(m => m.category === 'support').length}</h3>
              <p>Support Requests</p>
            </div>
          </div>
        </div>

        <div className="messages-layout">
          {/* Messages List */}
          <div className="messages-sidebar">
            <div className="filters-section">
              <div className="filter-tabs">
                {['all', 'unread', 'read', 'system', 'support', 'billing', 'feature'].map(tab => (
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

            <div className="messages-list">
              {filteredMessages.length === 0 ? (
                <div className="empty-state">
                  <i className="bx bx-envelope-open"></i>
                  <h3>No messages found</h3>
                  <p>You're all caught up! There are no {filter !== 'all' ? filter : ''} messages.</p>
                </div>
              ) : (
                filteredMessages.map(message => (
                  <div
                    key={message.id}
                    className={`message-item ${message.unread ? 'unread' : 'read'} ${selectedMessage?.id === message.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.unread) markAsRead(message.id);
                    }}
                  >
                    <div className="message-avatar">
                      {message.avatar}
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <h4 className="message-sender">{message.from}</h4>
                        <span className="message-time">{message.time}</span>
                      </div>
                      <div className="message-subject">{message.subject}</div>
                      <p className="message-preview">{message.preview}</p>
                      <div className="message-meta">
                        <span 
                          className="category-badge"
                          style={{ 
                            backgroundColor: `${getCategoryColor(message.category)}15`,
                            color: getCategoryColor(message.category)
                          }}
                        >
                          <i className={getCategoryIcon(message.category)}></i>
                          {message.category}
                        </span>
                      </div>
                    </div>
                    {message.unread && <div className="unread-dot"></div>}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="message-detail">
            {selectedMessage ? (
              <div className="message-view">
                <div className="message-header">
                  <div className="sender-info">
                    <div className="sender-avatar">
                      {selectedMessage.avatar}
                    </div>
                    <div className="sender-details">
                      <h3>{selectedMessage.from}</h3>
                      <p>{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="message-actions">
                    <button className="icon-btn" title="Reply">
                      <i className="bx bx-reply"></i>
                    </button>
                    <button className="icon-btn" title="Forward">
                      <i className="bx bx-share-alt"></i>
                    </button>
                    <button 
                      className="icon-btn danger" 
                      title="Delete"
                      onClick={() => deleteMessage(selectedMessage.id)}
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="message-subject-line">
                  <h2>{selectedMessage.subject}</h2>
                  <span className="message-time">{selectedMessage.time}</span>
                </div>

                <div className="message-body">
                  {selectedMessage.message.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="message-footer">
                  <button className="btn btn-primary">
                    <i className="bx bx-reply"></i>
                    Reply
                  </button>
                  <button className="btn btn-secondary">
                    <i className="bx bx-share-alt"></i>
                    Forward
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-message-selected">
                <i className="bx bx-envelope-open"></i>
                <h3>Select a message</h3>
                <p>Choose a message from the list to view its contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}