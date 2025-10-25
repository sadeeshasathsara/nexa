import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import LessonList from "./LessonList";
import LessonContent from "../lessons.components/LessonContent";
import AddLessonModal from "../modals.components/AddLessonModal";
import DeleteLessonModal from "../modals.components/DeleteLessonModal";

const CourseView = ({
  course,
  onBack,
  onAddLesson,
  onEditCourse,
  onDeleteLesson,
}) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [addingLesson, setAddingLesson] = useState(false);

  // Ensure lessonsList has proper structure with IDs
  const lessonsList =
    course.lessonsList?.map((lesson) => ({
      ...lesson,
      id: lesson.id || lesson._id, // Ensure id is available
    })) || [];

  const handleAddLesson = async (lessonData) => {
    try {
      setAddingLesson(true);
      const result = await onAddLesson(lessonData);

      if (result.success) {
        setShowAddLessonModal(false);
      } else {
        console.error("CourseView: Failed to add lesson:", result.error);
        alert("Failed to add lesson: " + result.error);
      }
    } catch (error) {
      console.error("CourseView: Error adding lesson:", error);
      alert("Error adding lesson: " + error.message);
    } finally {
      setAddingLesson(false);
    }
  };

  const handleDeleteLesson = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteLessonModal(true);
  };

  const confirmDeleteLesson = async () => {
    if (lessonToDelete) {
      try {
        await onDeleteLesson(lessonToDelete);
        setShowDeleteLessonModal(false);
        setLessonToDelete(null);

        // Clear selected lesson if it's the one being deleted
        if (selectedLesson?.id === lessonToDelete.id) {
          setSelectedLesson(null);
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
      }
    }
  };

  const handleSaveQuiz = (lessonId, quizData) => {
    const updatedLessonsList = lessonsList.map((lesson) => {
      if (lesson.id === lessonId) {
        return { ...lesson, quiz: quizData };
      }
      return lesson;
    });

    const updatedCourse = {
      ...course,
      lessonsList: updatedLessonsList,
    };

    onEditCourse(updatedCourse);

    if (selectedLesson?.id === lessonId) {
      setSelectedLesson({ ...selectedLesson, quiz: quizData });
    }
  };

  // Add validation to check if course exists
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Course not found</p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            {course.title || "Untitled Course"}
          </h1>
          <p className="text-gray-600 mt-1">
            {course.description || "No description"}
          </p>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        <div className="flex-1 overflow-y-auto">
          {selectedLesson ? (
            <LessonContent
              lesson={selectedLesson}
              onSaveQuiz={handleSaveQuiz}
              courseId={course.id} // Pass courseId to LessonContent
              course={course} // Pass entire course object if needed
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                {lessonsList.length === 0 ? (
                  <>
                    <p className="text-gray-500 text-lg mb-2">
                      No lessons added yet
                    </p>
                    <p className="text-gray-400 mb-6">
                      Start by adding your first lesson
                    </p>
                    <button
                      onClick={() => setShowAddLessonModal(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={addingLesson}
                    >
                      {addingLesson ? "Adding..." : "Add First Lesson"}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 text-lg">
                      Select a lesson from the right panel
                    </p>
                    <p className="text-gray-400">to view its content</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-96 border-l border-gray-200 bg-white">
          <LessonList
            lessons={lessonsList}
            selectedLesson={selectedLesson}
            onSelectLesson={setSelectedLesson}
            onAddLesson={() => setShowAddLessonModal(true)}
            onDeleteLesson={handleDeleteLesson}
          />
        </div>
      </div>

      <AddLessonModal
        isOpen={showAddLessonModal}
        onClose={() => setShowAddLessonModal(false)}
        onSubmit={handleAddLesson}
        loading={addingLesson}
        courseId={course.id} // Pass courseId to modal
      />

      <DeleteLessonModal
        isOpen={showDeleteLessonModal}
        lessonTitle={lessonToDelete?.title}
        onClose={() => {
          setShowDeleteLessonModal(false);
          setLessonToDelete(null);
        }}
        onConfirm={confirmDeleteLesson}
      />
    </div>
  );
};

export default CourseView;
