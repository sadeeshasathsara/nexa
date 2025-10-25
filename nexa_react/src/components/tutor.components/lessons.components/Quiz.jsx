import React, { useState, useEffect } from "react";
import { Plus, Trash2, Check, X, Save, Eye, EyeOff } from "lucide-react";
import { quizAPI } from "../../../apis/tutor.apis/quiz.api";

const Quiz = ({ quiz, onSaveQuiz, isEditMode = true, courseId, lessonId }) => {
  const [questions, setQuestions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState("Quiz");
  const [quizDescription, setQuizDescription] = useState("");

  // Load quiz data when component mounts or quiz prop changes
  useEffect(() => {
    if (quiz) {
      setQuestions(quiz.questions || []);
      setQuizTitle(quiz.title || "Quiz");
      setQuizDescription(quiz.description || "");
    } else {
      setQuestions([]);
      setQuizTitle("Quiz");
      setQuizDescription("");
    }
  }, [quiz]);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // More unique ID
      questionText: "",
      questionType: "multiple_choice",
      options: [
        { id: `opt-${Date.now()}-1`, text: "", isCorrect: false },
        { id: `opt-${Date.now()}-2`, text: "", isCorrect: false },
        { id: `opt-${Date.now()}-3`, text: "", isCorrect: false },
        { id: `opt-${Date.now()}-4`, text: "", isCorrect: false },
      ],
      points: 1,
      orderIndex: questions.length,
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestion = (questionId, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (questionId, optionIndex, field, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = q.options.map((option, idx) =>
            idx === optionIndex ? { ...option, [field]: value } : option
          );
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const setCorrectAnswer = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = q.options.map((option, idx) => ({
            ...option,
            isCorrect: idx === optionIndex,
          }));
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSave = async () => {
    if (!courseId || !lessonId) {
      console.error("Course ID and Lesson ID are required");
      alert(
        "Error: Course ID and Lesson ID are required. Please refresh the page and try again."
      );
      return;
    }

    try {
      setLoading(true);

      const quizData = {
        title: quizTitle,
        description: quizDescription,
        questions: questions.map((q, index) => ({
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options.map((opt) => ({
            text: opt.text,
            isCorrect: opt.isCorrect,
          })),
          points: q.points || 1,
          orderIndex: index,
        })),
      };

      const response = await quizAPI.saveQuiz(courseId, lessonId, quizData);

      if (response.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Notify parent component
        if (onSaveQuiz) {
          onSaveQuiz(response.data.quiz);
        }
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!courseId || !lessonId) {
      alert("Course ID and Lesson ID are required for publishing");
      return;
    }

    try {
      const response = await quizAPI.publishQuiz(courseId, lessonId);
      if (response.success) {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error publishing quiz:", error);
      alert("Failed to publish quiz: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex-1">
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Quiz Title"
            className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 w-full"
          />
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            placeholder="Quiz Description (optional)"
            className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 w-full resize-none mt-1"
            rows="2"
          />
        </div>
        <div className="flex gap-2">
          {quiz?.isPublished && (
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <EyeOff className="w-4 h-4" />
              <span>Unpublish</span>
            </button>
          )}
          {!quiz?.isPublished && quiz?.questions?.length > 0 && (
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Publish</span>
            </button>
          )}
          <button
            onClick={addQuestion}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Question
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
          <Check className="w-5 h-5" />
          <span>Quiz saved successfully!</span>
        </div>
      )}

      {questions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-2">No questions added yet</p>
          <p className="text-gray-400 mb-6">
            Click "Add Question" to create your first quiz question
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div
              key={question.id} // Use question.id instead of index
              className="bg-white rounded-lg border-2 border-gray-200 p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg">
                  {qIndex + 1}
                </span>

                <div className="flex-1">
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) =>
                      updateQuestion(
                        question.id,
                        "questionText",
                        e.target.value
                      )
                    }
                    placeholder="Enter your question here..."
                    className="w-full text-lg font-medium px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={() => deleteQuestion(question.id)}
                  className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete question"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="ml-14 space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Answer Options (Click checkmark to mark correct answer):
                </p>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={option.id} // Use option.id instead of index
                    className="flex items-center gap-3"
                  >
                    <button
                      onClick={() => setCorrectAnswer(question.id, optionIndex)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        option.isCorrect
                          ? "bg-green-600 border-green-600"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      title="Mark as correct answer"
                    >
                      {option.isCorrect && (
                        <Check className="w-5 h-5 text-white" />
                      )}
                    </button>

                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        updateOption(
                          question.id,
                          optionIndex,
                          "text",
                          e.target.value
                        )
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                      className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        option.isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="ml-14 mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Points:
                  <input
                    type="number"
                    min="1"
                    value={question.points || 1}
                    onChange={(e) =>
                      updateQuestion(
                        question.id,
                        "points",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="ml-2 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-20"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {loading ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      )}

      {quiz?.isPublished && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <Eye className="w-5 h-5" />
            <span className="font-medium">
              This quiz is published and visible to students
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
