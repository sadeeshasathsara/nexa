// admin.settings.page.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/admin.assets/admin.dashboard.css";
import "../../assets/admin.assets/admin.settings.css";
import AdminHeader from "../../components/admin.components/admin.header";
import AdminSidebar from "../../components/admin.components/admin.sidebar";
import { getAdminMe, updateAdminMe, changeAdminPasswordApi } from "../../apis/admin.apis/admin.profile.api";

// Lucide React icons (you can replace with Boxicons if preferred)
import { 
  User, Globe, Bell, Shield, Database, Palette, Mail, Key, 
  Users, BookOpen, Award, DollarSign, Settings, Camera,
  Save, Upload, Lock
} from "lucide-react";

export default function AdminSettingsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Platform settings
  const [platformSettings, setPlatformSettings] = useState({
    language: 'english',
    timezone: 'Asia/Colombo',
    currency: 'LKR',
    platformName: 'Nexa Learning Platform'
  });

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    department: "",
    bio: ""
  });

  // Security state
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordExpiry: 90
  });

  // Appearance state
  const [appearance, setAppearance] = useState({
    primaryColor: '#007AFF',
    secondaryColor: '#7C3AED',
    logo: '',
    favicon: ''
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    newUsers: true,
    courseSubmissions: true,
    payments: true,
    systemAlerts: true
  });

  // Password state
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'platform', label: 'Platform', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const languages = [
    { code: 'english', label: 'English', flag: '🇬🇧' },
    { code: 'tamil', label: 'Tamil', flag: '🇱🇰' },
    { code: 'sinhala', label: 'Sinhala', flag: '🇱🇰' }
  ];

  // Load initial data
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const profileData = await getAdminMe();
      setProfile({
        name: profileData.name || "Admin User",
        email: profileData.email || "admin@nexalearning.com",
        phone: profileData.phone || "+94 77 123 4567",
        title: profileData.title || "Super Administrator",
        department: profileData.department || "Administration",
        bio: profileData.bio || ""
      });
    } catch (e) {
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      await updateAdminMe(profile);
      setSuccess("Profile updated successfully");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePlatformSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      // Add your platform update API call here
      setSuccess("Platform settings updated successfully");
    } catch (e) {
      setError("Failed to update platform settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSecuritySave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      // Add your security update API call here
      setSuccess("Security settings updated successfully");
    } catch (e) {
      setError("Failed to update security settings");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (password.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      await changeAdminPasswordApi({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });
      setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setSuccess("Password changed successfully");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const handleAppearanceSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      // Add your appearance update API call here
      setSuccess("Appearance settings updated successfully");
    } catch (e) {
      setError("Failed to update appearance settings");
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationsSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      // Add your notifications update API call here
      setSuccess("Notification preferences updated successfully");
    } catch (e) {
      setError("Failed to update notification preferences");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-settings">
        <AdminHeader />
        <AdminSidebar />
        <main className="settings-main">
          <div className="loading-state">Loading settings...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-settings">
      <AdminHeader />
      <AdminSidebar />

      <main className="settings-main">
        {/* Settings Header */}
        <div className="settings-header">
          <div className="header-content">
            <div className="header-left">
              <Settings className="header-icon" />
              <div>
                <h1 className="page-title">Admin Settings</h1>
                <p className="page-sub">Manage your platform configuration</p>
              </div>
            </div>
            
            <div className="header-right">
              <Globe className="globe-icon" />
              <select
                value={platformSettings.language}
                onChange={(e) => setPlatformSettings({...platformSettings, language: e.target.value})}
                className="language-select"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="settings-layout">
          {/* Settings Sidebar Navigation */}
          <aside className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <Icon className="nav-icon" />
                    <span className="nav-label">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Settings Content */}
          <div className="settings-content">
            {(error || success) && (
              <div className={`message ${error ? 'error-message' : 'success-message'}`}>
                {error || success}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="profile-section-header">
                  <h2 className="tab-title">Profile Information</h2>
                  <a href="/v1/admin/register" className="btn btn-primary">
                    <User className="btn-icon" />
                    Add New Admin
                  </a>
                </div>

                    <div className="profile-header">
      <div className="avatar-section">
        <div className="avatar">
          {profile.name.charAt(0)}
        </div>
        <button className="avatar-edit">
          <Camera className="edit-icon" />
        </button>
      </div>
      <div className="profile-info">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-role">{profile.title}</p>
        <button className="change-photo">Change Photo</button>
      </div>
    </div>

    <form onSubmit={handleProfileSave} className="settings-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <input
            type="text"
            value={profile.title}
            disabled
            className="form-input disabled"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Bio</label>
        <textarea
          rows={4}
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
          placeholder="Tell us about yourself..."
          className="form-input"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          <Save className="btn-icon" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  </div>
)}

            {/* Platform Tab */}
            {activeTab === 'platform' && (
              <div className="tab-content">
                <h2 className="tab-title">Platform Settings</h2>
                
                <form onSubmit={handlePlatformSave} className="settings-form">
                  <div className="form-group">
                    <label className="form-label">Platform Name</label>
                    <input
                      type="text"
                      value={platformSettings.platformName}
                      onChange={(e) => setPlatformSettings({...platformSettings, platformName: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Default Language</label>
                      <select 
                        className="form-input"
                        value={platformSettings.language}
                        onChange={(e) => setPlatformSettings({...platformSettings, language: e.target.value})}
                      >
                        <option value="english">English</option>
                        <option value="tamil">Tamil</option>
                        <option value="sinhala">Sinhala</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time Zone</label>
                      <select 
                        className="form-input"
                        value={platformSettings.timezone}
                        onChange={(e) => setPlatformSettings({...platformSettings, timezone: e.target.value})}
                      >
                        <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Currency</label>
                      <select 
                        className="form-input"
                        value={platformSettings.currency}
                        onChange={(e) => setPlatformSettings({...platformSettings, currency: e.target.value})}
                      >
                        <option value="LKR">LKR - Sri Lankan Rupee</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="INR">INR - Indian Rupee</option>
                      </select>
                    </div>
                  </div>

                  <div className="section-divider">
                    <h3 className="section-title">Features</h3>
                    <div className="checkbox-group">
                      <label className="checkbox-item">
                        <span className="checkbox-label">Enable Course Certificates</span>
                        <input type="checkbox" defaultChecked className="checkbox-input" />
                      </label>
                      <label className="checkbox-item">
                        <span className="checkbox-label">Allow Student Reviews</span>
                        <input type="checkbox" defaultChecked className="checkbox-input" />
                      </label>
                      <label className="checkbox-item">
                        <span className="checkbox-label">Enable Discussion Forums</span>
                        <input type="checkbox" defaultChecked className="checkbox-input" />
                      </label>
                      <label className="checkbox-item">
                        <span className="checkbox-label">Enable Live Classes</span>
                        <input type="checkbox" className="checkbox-input" />
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary">Reset</button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      <Save className="btn-icon" />
                      {saving ? "Saving..." : "Save Settings"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="tab-content">
                <h2 className="tab-title">Security Settings</h2>
                
                <div className="security-sections">
                  <form onSubmit={handlePasswordChange} className="security-section">
                    <h3 className="section-title">Change Password</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input
                          type="password"
                          value={password.currentPassword}
                          onChange={(e) => setPassword({...password, currentPassword: e.target.value})}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          value={password.newPassword}
                          onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                          className="form-input"
                          required
                          minLength="6"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Confirm New Password</label>
                        <input
                          type="password"
                          value={password.confirmPassword}
                          onChange={(e) => setPassword({...password, confirmPassword: e.target.value})}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={saving || !password.currentPassword || !password.newPassword || password.newPassword !== password.confirmPassword}
                    >
                      <Lock className="btn-icon" />
                      {saving ? "Updating..." : "Update Password"}
                    </button>
                  </form>

                  <div className="security-section">
                    <h3 className="section-title">Two-Factor Authentication</h3>
                    <p className="section-description">Add an extra layer of security to your account</p>
                    <button className="btn btn-secondary">Enable 2FA</button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="tab-content">
                <h2 className="tab-title">Appearance Settings</h2>
                
                <form onSubmit={handleAppearanceSave} className="settings-form">
                  <div className="section">
                    <h3 className="section-title">Theme Colors</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Primary Color</label>
                        <div className="color-input-group">
                          <input 
                            type="color" 
                            value={appearance.primaryColor}
                            onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                            className="color-input" 
                          />
                          <input 
                            type="text" 
                            value={appearance.primaryColor}
                            onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                            className="form-input" 
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Secondary Color</label>
                        <div className="color-input-group">
                          <input 
                            type="color" 
                            value={appearance.secondaryColor}
                            onChange={(e) => setAppearance({...appearance, secondaryColor: e.target.value})}
                            className="color-input" 
                          />
                          <input 
                            type="text" 
                            value={appearance.secondaryColor}
                            onChange={(e) => setAppearance({...appearance, secondaryColor: e.target.value})}
                            className="form-input" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section-divider">
                    <h3 className="section-title">Logo & Branding</h3>
                    <div className="branding-group">
                      <div className="branding-item">
                        <label className="form-label">Platform Logo</label>
                        <div className="logo-upload">
                          <div className="logo-preview">
                            <Settings className="logo-icon" />
                          </div>
                          <button type="button" className="btn btn-secondary">
                            <Upload className="btn-icon" />
                            Upload Logo
                          </button>
                        </div>
                      </div>
                      <div className="branding-item">
                        <label className="form-label">Favicon</label>
                        <div className="logo-upload">
                          <div className="favicon-preview">
                            <Settings className="favicon-icon" />
                          </div>
                          <button type="button" className="btn btn-secondary">
                            <Upload className="btn-icon" />
                            Upload Favicon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      <Save className="btn-icon" />
                      {saving ? "Saving..." : "Save Appearance"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="tab-content">
                <h2 className="tab-title">Notification Preferences</h2>
                
                <form onSubmit={handleNotificationsSave} className="settings-form">
                  <div className="section">
                    <h3 className="section-title">Email Notifications</h3>
                    <div className="checkbox-group vertical">
                      <label className="checkbox-item detailed">
                        <div className="checkbox-content">
                          <p className="checkbox-label">New User Registrations</p>
                          <p className="checkbox-description">Get notified when new users sign up</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={notifications.newUsers}
                          onChange={(e) => setNotifications({...notifications, newUsers: e.target.checked})}
                          className="checkbox-input" 
                        />
                      </label>
                      <label className="checkbox-item detailed">
                        <div className="checkbox-content">
                          <p className="checkbox-label">Course Submissions</p>
                          <p className="checkbox-description">Alerts for new course uploads</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={notifications.courseSubmissions}
                          onChange={(e) => setNotifications({...notifications, courseSubmissions: e.target.checked})}
                          className="checkbox-input" 
                        />
                      </label>
                      <label className="checkbox-item detailed">
                        <div className="checkbox-content">
                          <p className="checkbox-label">Payment Transactions</p>
                          <p className="checkbox-description">Transaction and refund alerts</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={notifications.payments}
                          onChange={(e) => setNotifications({...notifications, payments: e.target.checked})}
                          className="checkbox-input" 
                        />
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      <Save className="btn-icon" />
                      {saving ? "Saving..." : "Save Preferences"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Other tabs can be implemented similarly */}
            {activeTab === 'courses' && (
              <div className="tab-content">
                <h2 className="tab-title">Course Management Settings</h2>
                <div className="coming-soon">
                  <BookOpen className="coming-soon-icon" />
                  <p>Course settings coming soon</p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="tab-content">
                <h2 className="tab-title">User Management Settings</h2>
                <div className="coming-soon">
                  <Users className="coming-soon-icon" />
                  <p>User management settings coming soon</p>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="tab-content">
                <h2 className="tab-title">Payment Settings</h2>
                <div className="coming-soon">
                  <DollarSign className="coming-soon-icon" />
                  <p>Payment settings coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
