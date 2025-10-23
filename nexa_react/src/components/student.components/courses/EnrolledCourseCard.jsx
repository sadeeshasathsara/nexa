// EnrolledCourseCard.js
import React from "react";

const EnrolledCourseCard = ({ course, onSelect }) => {
  const progressPercentage = Math.round(
    (course.completedLessons / course.totalLessons) * 100
  );

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={onSelect}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="mb-2">
            <div className="bg-gray-700 bg-opacity-50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-white text-sm font-semibold">
            {progressPercentage}% Complete
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">👨‍🏫</span>
            <span>{course.instructor}</span>{" "}
            {/* This should now show actual tutor name */}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">📚</span>
            <span>
              {course.completedLessons}/{course.totalLessons} Lessons
            </span>
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
          {course.completedLessons === 0 ? "Start Course" : "Continue Learning"}
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
