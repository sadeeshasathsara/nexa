import { useState } from "react";
import "../../assets/admin.assets/admin.login.css";
import { adminLogin } from "../../apis/admin.apis/admin.login.api";

export default function AdminLoginForm() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const emailErr =
    !form.email ? "Email is required" :
    !/\S+@\S+\.\S+/.test(form.email) ? "Please enter a valid email address" : "";

  const pwdErr =
    !form.password ? "Password is required" :
    form.password.length < 6 ? "Password must be at least 6 characters" : "";

  // In admin.login.form.jsx - Update the onSubmit function:
async function onSubmit(e) {
  e.preventDefault();
  setErr("");
  if (emailErr || pwdErr) return;

  try {
    setBusy(true);
    console.log('Attempting login with:', form.email);
    
    const result = await adminLogin({
      email: form.email,
      password: form.password,
    });
    
    console.log('Login successful:', result);
    
    // The response structure from your backend doesn't have "ok" property
    // It directly returns { token, admin } or throws error
    
    // Store both admin profile AND token
    if (result.admin && result.token) {
      localStorage.setItem("nexa_admin_profile", JSON.stringify(result.admin));
      localStorage.setItem("nexa_admin_token", result.token);
      
      // Redirect to dashboard
      window.location.href = "/v1/admin/dashboard";
    } else {
      throw new Error("Invalid response from server");
    }
    
  } catch (e) {
    console.error('Login error details:', e);
    const msg = e?.response?.data?.message || e?.message || "Login failed";
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
          <label className="form-label" htmlFor="email">Admin e-mail *</label>
          <input
            id="email"
            type="email"
            className={`form-input ${emailErr ? "error" : ""}`}
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e)=>setForm({...form, email:e.target.value})}
            required
          />
          {emailErr && <div className="error-message">{emailErr}</div>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password *</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPwd ? "text" : "password"}
              className={`form-input ${pwdErr ? "error" : ""}`}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e)=>setForm({...form, password:e.target.value})}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPwd(v => !v)}
              aria-label={showPwd ? "Hide password" : "Show password"}>
              {showPwd ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
          {pwdErr && <div className="error-message">{pwdErr}</div>}
        </div>

        {/* Options */}
        <div className="form-options">
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e)=>setForm({...form, remember:e.target.checked})}
            />
            <span>Remember me</span>
          </label>
          <a className="forgot-link" href="/v1/admin/forgot">Forgot password?</a>
        </div>

        {/* Submit */}
        <button className="login-button" type="submit" disabled={busy || emailErr || pwdErr}>
          <span>{busy ? "Signing in..." : "Sign in"}</span>
          {busy && <div className="loading-spinner" />}
        </button>

        {err && <div className="error-message form-error">{err}</div>}

        
      </form>
    </div>
  );
}