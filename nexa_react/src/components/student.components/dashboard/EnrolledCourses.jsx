// Updated EnrolledCourses.js
import React from "react";
import EnrolledCourseCard from "../courses/EnrolledCourseCard";
import BrowseCoursesButton from "./BrowseCoursesButton";

const EnrolledCourses = ({ onCourseSelect, courses = [] }) => {
  // Safe default for courses prop
  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Enrolled Courses
        </h2>
        <BrowseCoursesButton />
      </div>
      {safeCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeCourses.map((course) => (
            <EnrolledCourseCard
              key={course.id || course._id}
              course={course}
              onSelect={() => onCourseSelect(course)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600 text-lg mb-6">
            You haven't enrolled in any courses yet.
          </p>
          <BrowseCoursesButton />
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
