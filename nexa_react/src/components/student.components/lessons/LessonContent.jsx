// LessonContent.js
import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import CourseMaterial from "./CourseMaterial";
import Quiz from "./Quiz";
import { studentApiService } from "../../../apis/student.apis/student.api";

const LessonContent = ({ lesson, courseId, onLessonComplete }) => {
  const [activeTab, setActiveTab] = useState("video");
  const [lessonCompleted, setLessonCompleted] = useState(lesson.isCompleted);
  const [lessonData, setLessonData] = useState(lesson);

  useEffect(() => {
    loadLessonData();
  }, [lesson.id, courseId]);

  const loadLessonData = async () => {
    try {
      console.log("📚 Loading lesson data:", { courseId, lessonId: lesson.id });
      const response = await studentApiService.getLessonContent(
        courseId,
        lesson.id
      );
      if (response.data.success) {
        setLessonData(response.data.lesson);
        setLessonCompleted(response.data.lesson.isCompleted);
      }
    } catch (error) {
      console.error("Failed to load lesson data:", error);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await studentApiService.markLessonComplete(courseId, lesson.id);
      setLessonCompleted(true);
      if (onLessonComplete) {
        onLessonComplete(); // Refresh parent component
      }
    } catch (error) {
      console.error("Failed to mark lesson as complete:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md mb-6 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {lessonData.title}
              </h2>
              <span className="text-sm text-gray-600">
                Duration: {lessonData.duration}
              </span>
            </div>
            <div>
              {!lessonCompleted ? (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                  onClick={handleMarkComplete}
                >
                  Mark as Complete
                </button>
              ) : (
                <span className="bg-green-100 text-green-700 font-semibold px-6 py-2 rounded-lg flex items-center gap-2">
                  <span>✓</span> Completed
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "video"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("video")}
            >
              <span className="mr-2">📹</span>
              Video Lesson
            </button>
            {lessonData.hasMaterial && (
              <button
                className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === "material"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("material")}
              >
                <span className="mr-2">📄</span>
                Course Material
              </button>
            )}
            {lessonData.hasQuiz && (
              <button
                className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === "quiz"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("quiz")}
              >
                <span className="mr-2">📝</span>
                Quiz
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {activeTab === "video" && (
            <VideoPlayer
              videoUrl={lessonData.videoUrl}
              lessonId={lessonData.id}
              onComplete={handleMarkComplete}
            />
          )}
          {activeTab === "material" && lessonData.hasMaterial && (
            <CourseMaterial lessonId={lessonData.id} courseId={courseId} />
          )}
          {activeTab === "quiz" && lessonData.hasQuiz && (
            <Quiz lessonId={lessonData.id} courseId={courseId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
