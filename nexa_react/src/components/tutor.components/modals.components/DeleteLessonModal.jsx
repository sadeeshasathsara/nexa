import React from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteLessonModal = ({ isOpen, lessonTitle, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Delete Lesson</h2>
          </div>

          <p className="text-gray-700 mb-2">
            Are you sure you want to delete this lesson?
          </p>
          <p className="font-semibold text-gray-900 mb-4">"{lessonTitle}"</p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Warning:</span> This will
              permanently delete the lesson including:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 ml-4 list-disc space-y-1">
              <li>Video content</li>
              <li>Course materials</li>
              <li>Quiz questions and answers</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteLessonModal;
