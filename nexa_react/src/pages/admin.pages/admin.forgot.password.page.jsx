import AdminForgotPasswordForm from "../../components/admin.components/admin.forgot.password.form";
import "../../assets/admin.assets/admin.login.css";

export default function AdminForgotPasswordPage() {
  return (
    <main className="admin-login">
      <div className="login-container">
        <div className="login-layout">
          {/* Left Side - Admin Illustration */}
          <div className="login-left">
            <div className="admin-illustration">
              <div className="illustration-icon">
                <svg viewBox="0 0 24 24" width="80" height="80" fill="#2563eb">
                  <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                </svg>
              </div>
              <h1 className="brand-title">Reset Password</h1>
              <p className="brand-subtitle">Secure password recovery for administrators</p>
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
                <h2 className="form-title">Forgot Password</h2>
                <p className="form-subtitle">Enter your email to reset your password</p>
              </div>
              <AdminForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}