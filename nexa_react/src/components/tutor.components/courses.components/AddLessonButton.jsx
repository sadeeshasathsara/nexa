import React from "react";
import { Plus } from "lucide-react";

const AddLessonButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
    >
      <Plus className="w-5 h-5" />
      <span className="font-medium">Add Lesson</span>
    </button>
  );
};

export default AddLessonButton;
