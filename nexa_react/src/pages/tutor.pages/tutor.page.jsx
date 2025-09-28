import React from "react";
import TutorTopNav from "../../components/tutor.components/tutor.nav.component";
import TutorProfile from "./tutor.profile.page";
import { Outlet } from "react-router-dom";

function TutorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TutorTopNav />
      <main>
        {/* This renders courses, schedule, assignments, etc. */}
        <Outlet />
      </main>
    </div>
  );
}

export default TutorPage;
