import AdminLoginForm from "../../components/admin.components/admin.login.form";
import "../../assets/admin.assets/admin.login.css";

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <div className="login-container">
        <div className="login-layout">
          {/* Left Side - Admin Illustration */}
          <div className="login-left">
            <div className="admin-illustration">
              <div className="illustration-icon">
                <svg viewBox="0 0 24 24" width="80" height="80" fill="#2563eb">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h1 className="brand-title">NEXA Admin Portal</h1>
              <p className="brand-subtitle">Secure access for platform administrators</p>
              <div className="feature-list">
                
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="login-right">
            <div className="form-section">
              <div className="form-header">
                <div className="admin-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h2 className="form-title">Admin Sign In</h2>
                <p className="form-subtitle">Enter your credentials to continue</p>
              </div>
              <AdminLoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}