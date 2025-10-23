import React from "react";
import { BookOpen, Users, Edit2, Trash2 } from "lucide-react";

const CourseCard = ({ course, onSelect, onEdit, onDelete }) => {
  // Create full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/default-course-image.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-105"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(course.image)}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/default-course-image.jpg";
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleEdit}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            title="Edit course"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
            title="Delete course"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">
              {course.lessons} Lessons
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">
              {course.enrolledStudents} Students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
