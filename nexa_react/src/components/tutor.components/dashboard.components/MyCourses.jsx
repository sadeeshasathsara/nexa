import React, { useState } from "react";
import CourseCard from "../courses.components/CourseCard";
import AddCourseButton from "./AddCourseButton";
import AddCourseModal from "../modals.components/AddCourseModal";
import EditCourseModal from "../modals.components/EditCourseModal";
import DeleteConfirmModal from "../modals.components/DeleteConfirmModal";

const MyCourses = ({
  courses,
  onCourseSelect,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteCourse(selectedCourse.id);
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <AddCourseButton onClick={() => setShowAddModal(true)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={() => onCourseSelect(course)}
            onEdit={() => handleEdit(course)}
            onDelete={() => handleDelete(course)}
          />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg mb-4">No courses yet</p>
          <p className="text-gray-400 mb-6">
            Create your first course to get started
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Course
          </button>
        </div>
      )}

      <AddCourseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={onAddCourse}
      />

      <EditCourseModal
        isOpen={showEditModal}
        course={selectedCourse}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCourse(null);
        }}
        onSubmit={onEditCourse}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        courseName={selectedCourse?.title}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCourse(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MyCourses;
