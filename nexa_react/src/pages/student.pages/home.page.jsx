import React from "react";
import Navbar from "../../components/student.components/global.components/navbar.components/navbar.component";
import Footer from "../../components/global.components/footer.component";
import StudentDashboard from "../../components/student.components/dashboard/StudentDashboard";
function HomePage() {
  return (
    <>
      <Navbar />
      <StudentDashboard />
      <Footer />
    </>
  );
}

export default HomePage;
