/**
 * MotivationStep Component
 * ------------------------
 * Step 6: Motivation and personal statement for tutor registration
 *
 * FIELDS:
 *   - Why are you interested in tutoring with us? What do you hope to gain as a volunteer tutor? (required, 100–300 words)
 *   - Optional: Resume / portfolio link (optional)
 */

import React, { useState, useEffect } from "react";
import { MessageSquare, Link, Heart, Target } from "lucide-react";

const MotivationStep = ({
  formData,
  setFormData,
  errors,
  setErrors,
  touched,
  setTouched,
  onNext,
  onPrev,
}) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (formData.motivationStatement) {
      const words = formData.motivationStatement.trim().split(/\s+/);
      setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length);
    }
  }, [formData.motivationStatement]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "motivationStatement":
        if (!value || !value.trim()) {
          newErrors.motivationStatement = "Motivation statement is required";
        } else {
          const words = value.trim().split(/\s+/);
          const count =
            words.length === 1 && words[0] === "" ? 0 : words.length;

          if (count < 100) {
            newErrors.motivationStatement = `Please write at least 100 words (currently ${count} words)`;
          } else if (count > 300) {
            newErrors.motivationStatement = `Please keep within 300 words (currently ${count} words)`;
          } else {
            delete newErrors.motivationStatement;
          }
        }
        break;
      case "resumePortfolioLink":
        if (value && value.trim()) {
          const urlRegex =
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          if (!urlRegex.test(value)) {
            newErrors.resumePortfolioLink = "Please enter a valid URL";
          } else {
            delete newErrors.resumePortfolioLink;
          }
        } else {
          delete newErrors.resumePortfolioLink;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleMotivationChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, motivationStatement: value });

    // Update word count
    const words = value.trim().split(/\s+/);
    const count = words.length === 1 && words[0] === "" ? 0 : words.length;
    setWordCount(count);

    if (touched.motivationStatement) {
      validateField("motivationStatement", value);
    }
  };

  const handleLinkChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, resumePortfolioLink: value });

    if (touched.resumePortfolioLink) {
      validateField("resumePortfolioLink", value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const validateAndNext = () => {
    const allTouched = {
      motivationStatement: true,
      resumePortfolioLink: !!formData.resumePortfolioLink,
    };
    setTouched(allTouched);

    Object.keys(allTouched).forEach((field) => {
      if (allTouched[field]) {
        validateField(field, formData[field]);
      }
    });

    // Check if there are any errors after validation
    setTimeout(() => {
      const hasErrors = Object.keys(errors).length > 0;
      const hasEmptyRequiredFields = !formData.motivationStatement?.trim();

      if (!hasErrors && !hasEmptyRequiredFields) {
        onNext();
      }
    }, 100);
  };

  const getWordCountColor = () => {
    if (wordCount < 100) return "text-red-500";
    if (wordCount > 300) return "text-red-500";
    if (wordCount >= 250) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Motivation & Goals</h2>
        <p className="text-gray-600">Share your passion for education</p>
      </div>

      <div className="space-y-6">
        {/* Motivation Statement */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Why are you interested in tutoring with us? What do you hope to
              gain as a volunteer tutor?
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>

          <div className="relative">
            <textarea
              value={formData.motivationStatement || ""}
              onChange={handleMotivationChange}
              onBlur={() => handleBlur("motivationStatement")}
              placeholder="Share your passion for education, what motivates you to become a tutor, and what you hope to achieve through this volunteer opportunity. Consider mentioning your teaching philosophy, the impact you want to make on students, or personal experiences that inspired you to teach..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                errors.motivationStatement && touched.motivationStatement
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />

            <div className="absolute bottom-3 right-3 text-xs font-medium">
              <span className={getWordCountColor()}>{wordCount}/300 words</span>
            </div>
          </div>

          {/* Word count guidance */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span
                className={
                  wordCount >= 100 ? "text-green-600" : "text-gray-400"
                }
              >
                ✓ Minimum 100 words
              </span>
              <span
                className={wordCount <= 300 ? "text-green-600" : "text-red-500"}
              >
                ✓ Maximum 300 words
              </span>
            </div>
          </div>

          {errors.motivationStatement && touched.motivationStatement && (
            <p className="text-red-500 text-sm">{errors.motivationStatement}</p>
          )}
        </div>

        {/* Resume/Portfolio Link */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Link className="w-5 h-5 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Resume or Portfolio Link (optional)
            </label>
          </div>

          <input
            type="url"
            value={formData.resumePortfolioLink || ""}
            onChange={handleLinkChange}
            onBlur={() => handleBlur("resumePortfolioLink")}
            placeholder="https://example.com/my-resume or https://linkedin.com/in/yourname"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.resumePortfolioLink && touched.resumePortfolioLink
                ? "border-red-300"
                : "border-gray-300"
            }`}
          />

          <p className="text-sm text-gray-600">
            Share your LinkedIn profile, personal website, or online resume to
            help us understand your background better.
          </p>

          {errors.resumePortfolioLink && touched.resumePortfolioLink && (
            <p className="text-red-500 text-sm">{errors.resumePortfolioLink}</p>
          )}
        </div>

        {/* Inspiration Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">
                Writing Tips
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>
                  • Share specific experiences that sparked your interest in
                  education
                </li>
                <li>
                  • Mention the skills or knowledge you're excited to share
                </li>
                <li>
                  • Describe the impact you hope to make on students' lives
                </li>
                <li>
                  • Explain what you hope to learn from this volunteer
                  experience
                </li>
                <li>• Be authentic and let your passion shine through</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 cursor-pointer border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Back
        </button>
        <button
          onClick={validateAndNext}
          className="flex-1 cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MotivationStep;
