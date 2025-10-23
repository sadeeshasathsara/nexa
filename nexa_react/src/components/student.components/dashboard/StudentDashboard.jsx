// Updated StudentDashboard.js
import React, { useState, useEffect } from "react";
import EnrolledCourses from "./EnrolledCourses";
import CourseView from "../courses/CourseView";
import BannerSlider from "../home.components/banner.components/bannerSlider.component";
import NonEnrolledCoursesContainer from "./NonEnrolledCoursesContainer";
import { studentApiService } from "../../../apis/student.apis/student.api";

const StudentDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Updated StudentDashboard.js - loadDashboardData function
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentApiService.getDashboard();
      console.log("Dashboard API Response:", response.data);

      const { enrolledCourses, availableCourses } = response.data;

      // Debug logging
      console.log("Enrolled courses:", enrolledCourses);
      console.log("Available courses:", availableCourses);
      console.log("Available courses count:", availableCourses?.length);

      // Ensure we always have arrays, even if empty
      setEnrolledCourses(enrolledCourses || []);
      setAvailableCourses(availableCourses || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      setError("Failed to load dashboard data");
      setEnrolledCourses([]);
      setAvailableCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // StudentDashboard.js - handleCourseSelect function
  const handleCourseSelect = async (course) => {
    try {
      console.log("🎯 Selecting course:", course.id);
      const response = await studentApiService.getCourseView(course.id);
      console.log("✅ Course view response:", response.data);

      if (response.data.success) {
        setSelectedCourse(response.data.course);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("❌ Failed to load course:", error);
      setError("Failed to load course details");
      // Fallback: use the basic course data we have
      setSelectedCourse(course);
    }
  };

  const handleBackToDashboard = () => {
    setSelectedCourse(null);
    loadDashboardData(); // Refresh progress data
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={loadDashboardData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedCourse ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <BannerSlider />
          <NonEnrolledCoursesContainer
            courses={availableCourses}
            onEnroll={loadDashboardData}
          />
          <EnrolledCourses
            onCourseSelect={handleCourseSelect}
            courses={enrolledCourses}
          />
        </div>
      ) : (
        <CourseView course={selectedCourse} onBack={handleBackToDashboard} />
      )}
    </div>
  );
};

export default StudentDashboard;
