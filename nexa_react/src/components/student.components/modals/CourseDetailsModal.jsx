import React from "react";

const CourseDetailsModal = ({ course, onClose, onEnroll }) => {
  const handleEnroll = () => {
    onEnroll(course);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          ×
        </button>

        <div className="relative h-64 rounded-t-2xl overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-4xl font-bold mb-2">{course.title}</h2>
            <p className="flex items-center gap-2 text-lg">
              <span>👨‍🏫</span>
              Instructor: {course.instructor}
            </p>
          </div>
        </div>

        <div className="p-8">
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              About This Course
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {course.description}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              What You'll Learn
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span>Master the fundamental concepts</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span>Build practical projects</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span>Understand best practices</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span>Gain hands-on experience</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Course Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 text-center">
                <span className="text-4xl mb-2 block">📚</span>
                <div className="text-2xl font-bold text-gray-800">
                  {course.totalLessons}
                </div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 text-center">
                <span className="text-4xl mb-2 block">⏱️</span>
                <div className="text-2xl font-bold text-gray-800">
                  {course.duration || "10 hours"}
                </div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 text-center">
                <span className="text-4xl mb-2 block">📊</span>
                <div className="text-2xl font-bold text-gray-800">
                  {course.level || "Intermediate"}
                </div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 text-center">
                <span className="text-4xl mb-2 block">👥</span>
                <div className="text-2xl font-bold text-gray-800">
                  {course.enrolledStudents || "1,234"}
                </div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Course Content
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                {course.totalLessons} lessons covering all essential topics
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  <span>Introduction and Setup</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  <span>Core Concepts</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  <span>Advanced Topics</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  <span>Practical Projects</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  <span>Final Assessment</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Requirements
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Basic computer skills</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Internet connection</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Willingness to learn</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl flex gap-4">
          <button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg text-lg"
            onClick={handleEnroll}
          >
            Enroll in This Course
          </button>
          <button
            className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
