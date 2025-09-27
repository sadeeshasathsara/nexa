import AdminLoginForm from "../../components/admin.components/admin.login.form";
import "../../assets/admin.assets/admin.login.css";

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <div className="login-container">
        <div className="header-section">
          <div className="admin-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#fff">
              <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          <h1 className="page-title">Admin Portal</h1>
          <p className="page-subtitle">Secure access for platform administrators</p>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
