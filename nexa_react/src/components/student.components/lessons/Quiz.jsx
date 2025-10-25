// Quiz.js
import React, { useState, useEffect } from "react";
import QuizResults from "./QuizResults";
import { studentApiService } from "../../../apis/student.apis/student.api";

const Quiz = ({ lessonId, courseId }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuiz();
  }, [lessonId, courseId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📝 Loading quiz for:", { courseId, lessonId });

      const response = await studentApiService.getQuiz(courseId, lessonId);
      console.log("✅ Quiz response:", response.data);

      if (response.data.success) {
        setQuiz(response.data.quiz);
      } else {
        throw new Error(response.data.message || "Failed to load quiz");
      }
    } catch (error) {
      console.error("❌ Failed to load quiz:", error);
      setError("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      const submitData = {
        courseId,
        lessonId,
        answers,
        timeSpent: 600 - timeLeft, // Calculate time spent
      };

      const response = await studentApiService.submitQuiz(submitData);
      console.log("✅ Quiz submitted:", response.data);

      if (response.data.success) {
        setQuizSubmitted(true);
      }
    } catch (error) {
      console.error("❌ Failed to submit quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="text-center py-12">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={loadQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Quiz Available
          </h3>
          <p className="text-gray-600">There is no quiz for this lesson.</p>
        </div>
      </div>
    );
  }

  if (quizSubmitted) {
    return <QuizResults quiz={quiz} answers={answers} />;
  }

  if (!quizStarted) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {quiz.title}
          </h2>
          <p className="text-gray-600 text-lg">{quiz.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-200">
            <span className="text-4xl mb-3 block">❓</span>
            <div className="text-2xl font-bold text-gray-800">
              {quiz.questions.length}
            </div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-200">
            <span className="text-4xl mb-3 block">⏱️</span>
            <div className="text-2xl font-bold text-gray-800">
              {Math.floor(quiz.timeLimit / 60)} min
            </div>
            <div className="text-sm text-gray-600">Time Limit</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-200">
            <span className="text-4xl mb-3 block">✓</span>
            <div className="text-2xl font-bold text-gray-800">
              {quiz.passingScore}%
            </div>
            <div className="text-sm text-gray-600">Passing Score</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Instructions:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span>Read each question carefully before answering</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span>
                You can navigate between questions using the Next/Previous
                buttons
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span>Make sure to answer all questions before submitting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span>Once submitted, you cannot change your answers</span>
            </li>
          </ul>
        </div>

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl transition-colors duration-200 shadow-lg"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestion + 1) / quiz.questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
          <div
            className={`ml-6 flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
              timeLeft < 60
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <span>⏱️</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                ${
                  answers[question.id] === index
                    ? "bg-indigo-50 border-indigo-600 shadow-md"
                    : "bg-gray-50 border-gray-200 hover:border-indigo-300 hover:shadow-sm"
                }
              `}
              onClick={() => handleAnswerSelect(question.id, index)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${
                    answers[question.id] === index
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-gray-400"
                  }
                `}
                >
                  {answers[question.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span
                  className={`text-lg ${
                    answers[question.id] === index
                      ? "text-indigo-900 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {quiz.questions.map((q, index) => (
            <div
              key={q.id}
              className={`
                w-3 h-3 rounded-full cursor-pointer transition-all duration-200
                ${answers[q.id] !== undefined ? "bg-green-500" : "bg-gray-300"}
                ${
                  index === currentQuestion
                    ? "ring-4 ring-indigo-300 scale-125"
                    : ""
                }
              `}
              onClick={() => setCurrentQuestion(index)}
            />
          ))}
        </div>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200"
            onClick={handleNext}
          >
            Next →
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmitQuiz}
            disabled={answeredCount < quiz.questions.length}
          >
            Submit Quiz ({answeredCount}/{quiz.questions.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
