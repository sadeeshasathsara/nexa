import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/student.pages/home.page";
import StudentDashboard from "../../components/student.components/dashboard/StudentDashboard";
import ChatPage from "../../pages/student.pages/chat.page";

function StudentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index path="dashboard" element={<StudentDashboard />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default StudentRoutes;
