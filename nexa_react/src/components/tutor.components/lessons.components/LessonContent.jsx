import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import CourseMaterial from "./CourseMaterial";
import Quiz from "./Quiz";
import { quizAPI } from "../../../apis/tutor.apis/quiz.api"; // Import quiz API

const LessonContent = ({ lesson, onSaveQuiz, courseId, course }) => {
  const [activeTab, setActiveTab] = useState("video");
  const [quizData, setQuizData] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const tabs = [
    { id: "video", label: "Video Lesson" },
    { id: "materials", label: "Course Materials" },
    { id: "quiz", label: "Quiz" },
  ];

  // Fetch quiz data when lesson changes or when quiz tab is active
  useEffect(() => {
    const fetchQuizData = async () => {
      if (courseId && lesson?.id) {
        try {
          setLoadingQuiz(true);
          const response = await quizAPI.getQuiz(courseId, lesson.id);
          if (response.success) {
            setQuizData(response.data.quiz);
          }
        } catch (error) {
          console.error("Error fetching quiz:", error);
          setQuizData(null);
        } finally {
          setLoadingQuiz(false);
        }
      }
    };

    // Fetch quiz data when component mounts or when switching to quiz tab
    if (activeTab === "quiz" || !quizData) {
      fetchQuizData();
    }
  }, [courseId, lesson?.id, activeTab]);

  const handleSaveQuiz = async (quizData) => {
    if (onSaveQuiz) {
      onSaveQuiz(lesson.id, quizData);
    }
    // Also update local state
    setQuizData(quizData);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
        {lesson.description && (
          <p className="text-gray-600 mt-2">{lesson.description}</p>
        )}
      </div>

      <div className="border-b border-gray-200">
        <div className="px-6 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "video" && <VideoPlayer videoUrl={lesson.videoUrl} />}
        {activeTab === "materials" && (
          <CourseMaterial materialUrl={lesson.materialPdfUrl} />
        )}
        {activeTab === "quiz" && (
          <>
            {loadingQuiz ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading quiz...</p>
                </div>
              </div>
            ) : (
              <Quiz
                quiz={quizData}
                onSaveQuiz={handleSaveQuiz}
                isEditMode={true}
                courseId={courseId}
                lessonId={lesson.id}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LessonContent;
