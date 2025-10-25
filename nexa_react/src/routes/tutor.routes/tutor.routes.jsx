import React from "react";
import { Route, Routes } from "react-router-dom";
import TutorPage from "../../pages/tutor.pages/tutor.page";
import TutorProfile from "../../pages/tutor.pages/tutor.profile.page";
import TutorDashboard from "../../components/tutor.components/dashboard.components/TutorDashboard";
import TutorChat from "../../pages/tutor.pages/tutor.chat.page";

function TutorRoutes() {
  return (
    <Routes>
      {/* Group 1: Routes WITH top navbar (using TutorPage as layout) */}
      <Route path="/" element={<TutorPage />}>
        <Route index path="dashboard" element={<TutorDashboard />} />
        {/* <Route  element={<MyCourses />} /> */}
        <Route path="schedule" element={<TutorChat />} />
        <Route path="assignments" element={<div>Assignments Page</div>} />
        <Route path="students" element={<div>Students Page</div>} />
        <Route path="analytics" element={<div>Analytics Page</div>} />
        <Route path="profile" element={<TutorProfile />} />
        <Route path="settings" element={<div>Settings Page</div>} />
        <Route path="earnings" element={<div>Settings Page</div>} />
        <Route path="help" element={<div>Settings Page</div>} />
      </Route>

      {/* Group 2: Routes WITHOUT top navbar (standalone pages) */}
      {/* <Route path="/profile" element={<TutorProfile />} /> */}
    </Routes>
  );
}

export default TutorRoutes;
