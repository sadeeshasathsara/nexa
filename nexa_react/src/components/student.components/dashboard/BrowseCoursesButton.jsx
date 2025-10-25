import React from "react";

const BrowseCoursesButton = () => {
  const handleBrowseCourses = () => {
    // Navigate to course catalog/browse page
    console.log("Navigating to browse courses...");
  };

  return (
    <button
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
      onClick={handleBrowseCourses}
    >
      <span className="text-xl">🔍</span>
      Browse Courses
    </button>
  );
};

export default BrowseCoursesButton;
