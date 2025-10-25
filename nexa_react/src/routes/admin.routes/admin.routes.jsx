import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAdmin from "../../routes/admin.routes/require.admin";
import AdminLoginPage from "../../pages/admin.pages/admin.login.page.jsx";
import AdminDashboardPage from "../../pages/admin.pages/admin.dashboard.page.jsx";
import AdminSettingsPage from "../../pages/admin.pages/admin.settings.page.jsx";
import AdminRegisterPage from "../../pages/admin.pages/admin.register.page.jsx";
import AdminApprovalsPage from "../../pages/admin.pages/admin.approvals.page.jsx";
import Notifications from "../../pages/admin.pages/admin.Notifications.jsx";
import Messages from "../../pages/admin.pages/admin.Messages.jsx";
import AdminAnalytics from "../../pages/admin.pages/AdminAnalytics.jsx";


export default function AdminRoutes() {
  return (
    <Routes>
      {/* /v1/admin/login */}
      <Route path="login" element={<AdminLoginPage />} />

      <Route element={<RequireAdmin />}>
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="register" element={<AdminRegisterPage />} />
        <Route path="approvals" element={<AdminApprovalsPage />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="messages" element={<Messages />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>
    </Routes>
  );
}

