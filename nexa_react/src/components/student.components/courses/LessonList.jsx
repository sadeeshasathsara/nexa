import React from "react";
import LessonItem from "./LessonItem";

const LessonList = ({ lessons, selectedLesson, onLessonSelect }) => {
  const completedCount = lessons.filter((lesson) => lesson.isCompleted).length;
  const totalCount = lessons.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Course Content</h3>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="mb-2">
            <div className="bg-gray-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {completedCount}/{totalCount} lessons completed
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson, index) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            lessonNumber={index + 1}
            isSelected={selectedLesson?.id === lesson.id}
            onSelect={() => onLessonSelect(lesson)}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonList;
