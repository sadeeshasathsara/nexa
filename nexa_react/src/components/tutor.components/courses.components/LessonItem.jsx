import React from "react";
import { PlayCircle, FileText, ClipboardList, Trash2 } from "lucide-react";

const LessonItem = ({ lesson, index, isSelected, onSelect, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(lesson);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all relative group ${
        isSelected
          ? "bg-blue-50 border-2 border-blue-500 shadow-md"
          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            isSelected ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-sm mb-1 ${
              isSelected ? "text-blue-900" : "text-gray-900"
            }`}
          >
            {lesson.title}
          </h3>

          <div className="flex gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1" title="Has video">
              <PlayCircle className="w-3 h-3" />
              <span>Video</span>
            </div>
            <div className="flex items-center gap-1" title="Has materials">
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </div>
            <div className="flex items-center gap-1" title="Has quiz">
              <ClipboardList className="w-3 h-3" />
              <span>Quiz</span>
            </div>
          </div>
        </div>

        {/* Delete button - shows on hover */}
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
          title="Delete lesson"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default LessonItem;
