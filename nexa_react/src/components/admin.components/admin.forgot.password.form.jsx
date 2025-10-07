import { useState } from "react";
import "../../assets/admin.assets/admin.login.css";
import { adminForgotPassword } from "../../apis/admin.apis/admin.forgot.password.api";

export default function AdminForgotPasswordForm() {
  const [form, setForm] = useState({ email: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const emailErr =
    !form.email ? "Email is required" :
    !/\S+@\S+\.\S+/.test(form.email) ? "Please enter a valid email address" : "";

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setSuccess(false);
    
    if (emailErr) return;

    try {
      setBusy(true);

      const result = await adminForgotPassword({
        email: form.email,
      });
      
      console.log('Forgot password result:', result);
      
      if (!result.ok) {
        throw new Error(result.message || "Failed to send reset email");
      }

      setSuccess(true);
      setForm({ email: "" });
      
    } catch (e) {
      console.error('Forgot password error:', e);
      const msg = e?.message || "Failed to send reset email";
      setErr(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={onSubmit} noValidate>
        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Admin Email *</label>
          <input
            id="email"
            type="email"
            className={`form-input ${emailErr ? "error" : ""}`}
            placeholder="Enter your admin email address"
            value={form.email}
            onChange={(e)=>setForm({...form, email:e.target.value})}
            required
            disabled={busy}
          />
          {emailErr && <div className="error-message">{emailErr}</div>}
        </div>

        {/* Success Message */}
        {success && (
          <div className="success-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Password reset link has been sent to your email!</span>
          </div>
        )}

        {/* Error Message */}
        {err && <div className="error-message form-error">{err}</div>}

        {/* Submit */}
        <button className="login-button" type="submit" disabled={busy || emailErr}>
          <span>{busy ? "Sending..." : "Send Reset Link"}</span>
          {busy && <div className="loading-spinner" />}
        </button>

        {/* Back to Login */}
        <div className="signup-section">
          <p>
            Remember your password?{" "}
            <a href="/v1/admin/login" className="signup-link">
              Back to Sign In
            </a>
          </p>
        </div>

        {/* Security Notice */}
        <div className="security-notice" style={{marginTop:"1rem"}}>
          <p className="security-title">Secure Password Reset</p>
          <p className="security-text">
            We'll send you a secure link to reset your password. The link will expire in 1 hour for security reasons.
          </p>
        </div>
      </form>
    </div>
  );
}