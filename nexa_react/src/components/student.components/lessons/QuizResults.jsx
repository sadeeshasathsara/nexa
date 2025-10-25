import React from "react";

const QuizResults = ({ quiz, answers }) => {
  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100),
    };
  };

  const score = calculateScore();
  const passed = score.percentage >= quiz.passingScore;

  const handleRetakeQuiz = () => {
    window.location.reload();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 mb-8 text-center">
        <div className={`text-7xl mb-4 ${passed ? "animate-bounce" : ""}`}>
          {passed ? "🎉" : "📚"}
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          {passed ? "Congratulations!" : "Keep Learning!"}
        </h2>
        <p className="text-lg text-gray-600">
          {passed
            ? "You have successfully passed this quiz!"
            : "You need more practice. Review the lesson and try again."}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          <div className="relative">
            <svg width="200" height="200" className="transform -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="15"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke={passed ? "#10b981" : "#ef4444"}
                strokeWidth="15"
                strokeDasharray={`${score.percentage * 5.34} 534`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-gray-800">
                {score.percentage}%
              </span>
              <span className="text-lg text-gray-600 mt-1">
                {score.correct}/{score.total}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-between md:justify-start gap-8 bg-green-50 px-6 py-4 rounded-lg">
              <span className="text-gray-700 font-medium">
                Correct Answers:
              </span>
              <span className="text-3xl font-bold text-green-600">
                {score.correct}
              </span>
            </div>
            <div className="flex items-center justify-between md:justify-start gap-8 bg-red-50 px-6 py-4 rounded-lg">
              <span className="text-gray-700 font-medium">
                Incorrect Answers:
              </span>
              <span className="text-3xl font-bold text-red-600">
                {score.total - score.correct}
              </span>
            </div>
            <div className="flex items-center justify-between md:justify-start gap-8 bg-indigo-50 px-6 py-4 rounded-lg">
              <span className="text-gray-700 font-medium">Passing Score:</span>
              <span className="text-3xl font-bold text-indigo-600">
                {quiz.passingScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Answer Review</h3>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className={`p-6 rounded-lg border-2 ${
                  isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-semibold text-gray-700">
                    Question {index + 1}
                  </span>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                </div>

                <p className="text-lg font-medium text-gray-800 mb-4">
                  {question.question}
                </p>

                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-lg ${
                      isCorrect
                        ? "bg-green-100 border-2 border-green-400"
                        : "bg-red-100 border-2 border-red-400"
                    }`}
                  >
                    <div className="font-semibold text-gray-700 mb-1">
                      Your answer:
                    </div>
                    <div className="text-gray-800">
                      {question.options[userAnswer]}
                    </div>
                  </div>
                  {!isCorrect && (
                    <div className="p-4 rounded-lg bg-green-100 border-2 border-green-400">
                      <div className="font-semibold text-gray-700 mb-1">
                        Correct answer:
                      </div>
                      <div className="text-gray-800">
                        {question.options[question.correctAnswer]}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-8">
        {!passed && (
          <button
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-md"
            onClick={handleRetakeQuiz}
          >
            Retake Quiz
          </button>
        )}
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-md">
          {passed ? "Continue to Next Lesson" : "Review Lesson"}
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
