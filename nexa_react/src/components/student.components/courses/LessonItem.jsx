import React from "react";

const LessonItem = ({ lesson, lessonNumber, isSelected, onSelect }) => {
  return (
    <div
      className={`
        rounded-lg p-4 cursor-pointer transition-all duration-200 border-2
        ${
          isSelected
            ? "bg-indigo-50 border-indigo-500 shadow-md"
            : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm"
        }
        ${lesson.isCompleted ? "opacity-100" : "opacity-90"}
      `}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
          ${
            lesson.isCompleted
              ? "bg-green-500 text-white"
              : isSelected
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }
        `}
        >
          {lesson.isCompleted ? "✓" : lessonNumber}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={`font-semibold mb-2 ${
              isSelected ? "text-indigo-700" : "text-gray-800"
            }`}
          >
            {lesson.title}
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded">
              <span>⏱️</span>
              {lesson.duration}
            </span>
            {lesson.hasQuiz && (
              <span className="flex items-center gap-1 text-purple-600 bg-purple-100 px-2 py-1 rounded">
                <span>📝</span>
                Quiz
              </span>
            )}
            {lesson.hasMaterial && (
              <span className="flex items-center gap-1 text-blue-600 bg-blue-100 px-2 py-1 rounded">
                <span>📄</span>
                Material
              </span>
            )}
          </div>
        </div>

        {lesson.isCompleted && (
          <div className="flex-shrink-0 text-green-500 text-xl">✓</div>
        )}
      </div>
    </div>
  );
};

export default LessonItem;
