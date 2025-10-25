import React, { useState, useEffect } from "react";
import StaticTipsWidget from "./StaticTipsWidget";
import MyCourses from "./MyCourses";
import CourseView from "../courses.components/CourseView";
import { courseAPI } from "../../../apis/tutor.apis/course.api";
import { lessonAPI } from "../../../apis/tutor.apis/lesson.api"; // Add lesson API
import { quizAPI } from "../../../apis/tutor.apis/quiz.api"; // Import quiz API

const TutorDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseLessons, setCourseLessons] = useState({}); // Store lessons by course ID

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseAPI.getTutorCourses();
      console.log(response.data.courses);
      setCourses(response.data.courses);
    } catch (err) {
      setError(err.message || "Failed to load courses");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // In TutorDashboard component, update the fetchCourseLessons function
  const fetchCourseLessons = async (courseId) => {
    try {
      const response = await lessonAPI.getCourseLessons(courseId);
      const lessons = response.data.lessons || [];

      // For each lesson, fetch its quiz data
      const lessonsWithQuizes = await Promise.all(
        lessons.map(async (lesson) => {
          try {
            const quizResponse = await quizAPI.getQuiz(courseId, lesson.id);
            return {
              ...lesson,
              quiz: quizResponse.data.quiz || null,
            };
          } catch (error) {
            console.error(
              `Error fetching quiz for lesson ${lesson.id}:`,
              error
            );
            return {
              ...lesson,
              quiz: null,
            };
          }
        })
      );

      return lessonsWithQuizes;
    } catch (err) {
      console.error("Error fetching lessons:", err);
      return [];
    }
  };

  const handleCourseSelect = async (course) => {
    try {
      // Fetch lessons for this course
      const lessons = await fetchCourseLessons(course.id);

      // Create course object with lessons
      const courseWithLessons = {
        ...course,
        lessonsList: lessons, // Use actual lessons from backend
        lessons: lessons.length,
      };

      setSelectedCourse(courseWithLessons);

      // Store lessons in state for future use
      setCourseLessons((prev) => ({
        ...prev,
        [course.id]: lessons,
      }));
    } catch (err) {
      setError("Failed to load course lessons");
      console.error("Error loading course lessons:", err);
    }
  };

  const handleBackToDashboard = () => {
    setSelectedCourse(null);
  };

  const handleAddCourse = async (newCourse) => {
    try {
      setError(null);
      const response = await courseAPI.createCourse(newCourse);

      // Add the new course to the local state
      const addedCourse = response.data.course;
      setCourses((prevCourses) => [...prevCourses, addedCourse]);

      return { success: true, course: addedCourse };
    } catch (err) {
      const errorMsg = err.message || "Failed to create course";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const handleEditCourse = async (updatedCourse) => {
    try {
      setError(null);
      const response = await courseAPI.updateCourse(
        updatedCourse.id,
        updatedCourse
      );

      // Update the course in local state
      const editedCourse = response.data.course;
      setCourses((prevCourses) =>
        prevCourses.map((c) => (c.id === editedCourse.id ? editedCourse : c))
      );

      // Update selected course if it's the one being edited
      if (selectedCourse?.id === editedCourse.id) {
        setSelectedCourse(editedCourse);
      }

      return { success: true, course: editedCourse };
    } catch (err) {
      const errorMsg = err.message || "Failed to update course";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      setError(null);
      await courseAPI.deleteCourse(courseId);

      // Remove the course from local state
      setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseId));

      // Clear selected course if it's the one being deleted
      if (selectedCourse?.id === courseId) {
        setSelectedCourse(null);
      }

      return { success: true };
    } catch (err) {
      const errorMsg = err.message || "Failed to delete course";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const handleAddLesson = async (lessonData) => {
    try {
      console.log("TutorDashboard: Received lesson data:", lessonData);

      // Extract courseId from lessonData (it should be passed from the modal)
      const courseId = lessonData.courseId;

      if (!courseId) {
        throw new Error("Course ID is required");
      }

      setError(null);

      // Prepare data for backend
      const backendLessonData = {
        courseId: courseId,
        title: lessonData.title,
        description: lessonData.description || "",
        orderIndex: courseLessons[courseId]?.length || 0,
        videoFile: lessonData.videoFile,
        materialFile: lessonData.materialFile,
      };

      console.log("TutorDashboard: Backend lesson data:", backendLessonData);

      const response = await lessonAPI.createLesson(backendLessonData);
      console.log("TutorDashboard: Backend response:", response);

      const newLesson = response.data.lesson;

      // Update local state
      const updatedLessons = [...(courseLessons[courseId] || []), newLesson];

      setCourseLessons((prev) => ({
        ...prev,
        [courseId]: updatedLessons,
      }));

      // Update courses list to reflect new lesson count
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === courseId ? { ...c, lessons: updatedLessons.length } : c
        )
      );

      // Update selected course if it's the current one
      if (selectedCourse?.id === courseId) {
        setSelectedCourse((prev) => ({
          ...prev,
          lessonsList: updatedLessons,
          lessons: updatedLessons.length,
        }));
      }

      return { success: true, lesson: newLesson };
    } catch (err) {
      console.error("TutorDashboard: Error adding lesson:", err);
      const errorMsg = err.message || "Failed to create lesson";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // UPDATED: Use backend API for deleting lessons
  const handleDeleteLesson = async (courseId, lessonId) => {
    try {
      setError(null);
      await lessonAPI.deleteLesson(courseId, lessonId);

      // Update local state
      const updatedLessons = (courseLessons[courseId] || []).filter(
        (lesson) => lesson.id !== lessonId
      );

      setCourseLessons((prev) => ({
        ...prev,
        [courseId]: updatedLessons,
      }));

      // Update courses list
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === courseId ? { ...c, lessons: updatedLessons.length } : c
        )
      );

      // Update selected course if it's the current one
      if (selectedCourse?.id === courseId) {
        setSelectedCourse((prev) => ({
          ...prev,
          lessonsList: updatedLessons,
          lessons: updatedLessons.length,
        }));

        // Clear selected lesson if it's the one being deleted
        if (selectedCourse.selectedLesson?.id === lessonId) {
          setSelectedCourse((prev) => ({ ...prev, selectedLesson: null }));
        }
      }

      return { success: true };
    } catch (err) {
      const errorMsg = err.message || "Failed to delete lesson";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Error loading courses</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchCourses}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-900 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {!selectedCourse ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Tutor Dashboard
          </h1>
          <StaticTipsWidget />
          <MyCourses
            courses={courses}
            onCourseSelect={handleCourseSelect}
            onAddCourse={handleAddCourse}
            onEditCourse={handleEditCourse}
            onDeleteCourse={handleDeleteCourse}
            loading={loading}
          />
        </div>
      ) : (
        <CourseView
          course={selectedCourse}
          onBack={handleBackToDashboard}
          onAddLesson={handleAddLesson} // Now this matches the signature
          onEditCourse={handleEditCourse}
          onDeleteLesson={(lesson) =>
            handleDeleteLesson(selectedCourse.id, lesson.id)
          }
        />
      )}
    </div>
  );
};

export default TutorDashboard;
