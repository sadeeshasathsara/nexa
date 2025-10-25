import React from "react";
import Navbar from "../../components/student.components/global.components/navbar.components/navbar.component";
import Footer from "../../components/global.components/footer.component";
import StudentDashboard from "../../components/student.components/dashboard/StudentDashboard";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Navbar />

      {/* The content of nested routes (Dashboard, Analytics, etc.) renders here */}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
