import React from "react";
import TutorTopNav from "../../components/tutor.components/tutor.nav.component";
import Footer from "../../components/global.components/footer.component";
import TutorProfile from "./tutor.profile.page";
import { Outlet } from "react-router-dom";

function TutorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TutorTopNav />
      <main>
        <Outlet /> {/* This renders courses, schedule, assignments, etc. */}
      </main>
      <Footer />
    </div>
  );
}

export default TutorPage;
