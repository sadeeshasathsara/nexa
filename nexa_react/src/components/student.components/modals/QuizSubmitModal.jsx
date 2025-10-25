import React from "react";

const QuizSubmitModal = ({
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}) => {
  const allAnswered = answeredCount === totalQuestions;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`text-6xl mb-6 text-center ${
            allAnswered ? "animate-bounce" : ""
          }`}
        >
          {allAnswered ? "✓" : "⚠️"}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Submit Quiz?
        </h2>

        {allAnswered ? (
          <p className="text-gray-600 text-center mb-6">
            You have answered all questions. Are you ready to submit your quiz?
          </p>
        ) : (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
            <p className="text-gray-700 mb-2">
              You have{" "}
              <strong className="text-yellow-700">{unansweredCount}</strong>{" "}
              unanswered question{unansweredCount > 1 ? "s" : ""}.
            </p>
            <p className="text-gray-600 text-sm">
              Unanswered questions will be marked as incorrect.
            </p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Answered:</span>
            <span className="text-gray-800 font-bold text-lg">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
          {!allAnswered && (
            <div className="flex justify-between items-center text-yellow-700">
              <span className="font-medium">Unanswered:</span>
              <span className="font-bold text-lg">{unansweredCount}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 text-center mb-6 italic">
          Once submitted, you cannot change your answers.
        </p>

        <div className="flex gap-3">
          <button
            className={`flex-1 font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md ${
              allAnswered
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
            onClick={onConfirm}
          >
            {allAnswered ? "Submit Quiz" : "Submit Anyway"}
          </button>
          <button
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
            onClick={onCancel}
          >
            {allAnswered ? "Review Answers" : "Continue Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSubmitModal;
