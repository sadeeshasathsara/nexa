// CourseView.js
import React, { useState, useEffect } from "react";
import LessonList from "./LessonList";
import LessonContent from "../lessons/LessonContent";
import { studentApiService } from "../../../apis/student.apis/student.api";

const CourseView = ({ course, onBack }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [courseData, setCourseData] = useState(course);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourseData();
  }, [course.id]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📖 Loading course data for:", course.id);

      const response = await studentApiService.getCourseView(course.id);
      console.log("✅ Course data response:", response.data);

      if (response.data.success) {
        setCourseData(response.data.course);
        setLessons(response.data.course.lessons || []);
      } else {
        throw new Error(response.data.message || "Failed to load course");
      }
    } catch (error) {
      console.error("❌ Failed to load course data:", error);
      setError("Failed to load course content");
      // Fallback to the passed course data
      setLessons(course.lessons || []);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <button
            className="text-indigo-600 hover:text-indigo-700 font-medium mb-3 flex items-center gap-2 transition-colors"
            onClick={onBack}
          >
            <span>←</span> Back to Dashboard
          </button>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading course content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <button
            className="text-indigo-600 hover:text-indigo-700 font-medium mb-3 flex items-center gap-2 transition-colors"
            onClick={onBack}
          >
            <span>←</span> Back to Dashboard
          </button>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
            <button
              onClick={loadCourseData}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <button
          className="text-indigo-600 hover:text-indigo-700 font-medium mb-3 flex items-center gap-2 transition-colors"
          onClick={onBack}
        >
          <span>←</span> Back to Dashboard
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {courseData.title}
          </h1>
          <p className="text-gray-600 mt-1">
            Instructor: {courseData.instructor}
          </p>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        <div className="flex-1 overflow-y-auto">
          {selectedLesson ? (
            <LessonContent
              lesson={selectedLesson}
              courseId={courseData.id}
              onLessonComplete={() => loadCourseData()} // Refresh progress
            />
          ) : (
            <div className="p-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to {courseData.title}
                </h2>
                <p className="text-gray-600 mb-8">
                  Select a lesson from the right sidebar to start learning
                </p>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Course Overview
                  </h3>
                  <p className="text-gray-700 mb-6">{courseData.description}</p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">
                        {courseData.totalLessons}
                      </div>
                      <div className="text-sm text-gray-600">Total Lessons</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {courseData.completedLessons}
                      </div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {courseData.progress}%
                      </div>
                      <div className="text-sm text-gray-600">Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <LessonList
            lessons={lessons}
            selectedLesson={selectedLesson}
            onLessonSelect={handleLessonSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseView;
