import React from "react";
import LessonItem from "./LessonItem";
import AddLessonButton from "./AddLessonButton";

const LessonList = ({
  lessons,
  selectedLesson,
  onSelectLesson,
  onAddLesson,
  onDeleteLesson,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Course Lessons</h2>
        <span className="text-sm text-gray-500">{lessons.length} lessons</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {lessons.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="mb-4">No lessons yet</p>
          </div>
        ) : (
          <div className="p-2">
            {lessons.map((lesson, index) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={index}
                isSelected={selectedLesson?.id === lesson.id}
                onSelect={() => onSelectLesson(lesson)}
                onDelete={onDeleteLesson}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <AddLessonButton onClick={onAddLesson} />
      </div>
    </div>
  );
};

export default LessonList;
