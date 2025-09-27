/**
 * LegalSafetyStep Component
 * -------------------------
 * Step 4: Legal and safety verification for tutor registration
 *
 * FIELDS:
 *   - Have you ever been convicted of a felony or misdemeanor, or is any such charge pending? (required, yes/no)
 *   - Have you ever faced academic/professional sanctions (dismissal, probation, suspension)? (required, yes/no)
 *   - Do you agree to a background check? (required, yes/no)
 *   - Do you certify that all information submitted is true and complete? (required, yes/no)
 *   - Do you understand all tutoring must take place on our platform? (required, yes/no)
 *   - Do you understand this is a 100% volunteer (unpaid) position? (required, yes/no)
 */

import React, { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Heart,
} from "lucide-react";

const LegalSafetyStep = ({
  formData,
  setFormData,
  errors,
  setErrors,
  touched,
  setTouched,
  onNext,
  onPrev,
}) => {
  const questions = [
    {
      key: "hasConviction",
      icon: AlertTriangle,
      question:
        "Have you ever been convicted of a felony or misdemeanor, or is any such charge pending?",
      description:
        "Please answer honestly. Some convictions may not disqualify you.",
    },
    {
      key: "hasAcademicSanctions",
      icon: FileText,
      question:
        "Have you ever faced academic/professional sanctions (dismissal, probation, suspension)?",
      description:
        "This includes actions taken by schools, employers, or professional organizations.",
    },
    {
      key: "agreesToBackgroundCheck",
      icon: Shield,
      question: "Do you agree to a background check?",
      description: "This is required for all tutors to ensure student safety.",
    },
    {
      key: "certifiesInformationTrue",
      icon: CheckCircle,
      question:
        "Do you certify that all information submitted is true and complete?",
      description:
        "False information may result in immediate disqualification.",
    },
    {
      key: "understandsPlatformOnly",
      icon: Users,
      question:
        "Do you understand all tutoring must take place on our platform?",
      description:
        "Off-platform tutoring is not permitted for safety and quality assurance.",
    },
    {
      key: "understandsUnpaidPosition",
      icon: Heart,
      question: "Do you understand this is a 100% volunteer (unpaid) position?",
      description:
        "This is a volunteer opportunity to make a positive impact on education.",
    },
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (value === null || value === undefined) {
      newErrors[name] = "Please select yes or no";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const validateAndNext = () => {
    const allTouched = {};
    questions.forEach((q) => {
      allTouched[q.key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    questions.forEach((q) => {
      validateField(q.key, formData[q.key]);
    });

    // Check if there are any errors after validation
    setTimeout(() => {
      const hasErrors = Object.keys(errors).length > 0;
      const hasEmptyRequiredFields = questions.some(
        (q) => formData[q.key] === null || formData[q.key] === undefined
      );

      if (!hasErrors && !hasEmptyRequiredFields) {
        onNext();
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Legal & Safety Verification
        </h2>
        <p className="text-gray-600">
          Please answer all questions honestly to ensure student safety
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.key} className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <q.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 leading-relaxed">
                  {q.question}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{q.description}</p>
              </div>
            </div>

            <div className="flex gap-4 ml-14">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={q.key}
                  value="true"
                  checked={formData[q.key] === true}
                  onChange={() => handleChange(q.key, true)}
                  onBlur={() => handleBlur(q.key)}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={q.key}
                  value="false"
                  checked={formData[q.key] === false}
                  onChange={() => handleChange(q.key, false)}
                  onBlur={() => handleBlur(q.key)}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>

            {errors[q.key] && touched[q.key] && (
              <p className="text-red-500 text-sm ml-14">{errors[q.key]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Important Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              All answers will be verified during the background check process.
              Providing false information may result in immediate
              disqualification from the tutoring program.
            </p>
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

export default LegalSafetyStep;
