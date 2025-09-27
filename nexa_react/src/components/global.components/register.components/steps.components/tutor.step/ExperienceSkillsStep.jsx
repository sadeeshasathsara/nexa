/**
 * ExperienceSkillsStep Component
 * ------------------------------
 * Step 5: Tutoring experience and skills for tutor registration
 *
 * FIELDS:
 *   - Subjects you can tutor (required, multi-select with subject IDs)
 *   - Preferred grade levels (required, multi-select with grade IDs)
 *   - Have you tutored before? (required, yes/no)
 *   - If yes, describe your tutoring experience (optional text field)
 *   - Availability / preferred tutoring schedule (required, array with day and time)
 */

import React, { useState } from "react";
import { BookOpen, Users, Calendar, Clock, Plus, X, Award } from "lucide-react";

const ExperienceSkillsStep = ({
  formData,
  setFormData,
  errors,
  setErrors,
  touched,
  setTouched,
  onNext,
  onPrev,
}) => {
  const [newAvailability, setNewAvailability] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const subjects = [
    { id: "math", name: "Mathematics" },
    { id: "science", name: "Science" },
    { id: "english", name: "English" },
    { id: "history", name: "History" },
    { id: "geography", name: "Geography" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
    { id: "economics", name: "Economics" },
    { id: "psychology", name: "Psychology" },
    { id: "sociology", name: "Sociology" },
    { id: "philosophy", name: "Philosophy" },
    { id: "literature", name: "Literature" },
    { id: "art", name: "Art" },
    { id: "music", name: "Music" },
    { id: "computer-science", name: "Computer Science" },
    { id: "programming", name: "Programming" },
    { id: "statistics", name: "Statistics" },
  ];

  const gradeLevels = [
    { id: "elementary", name: "Elementary (K-5)" },
    { id: "middle", name: "Middle School (6-8)" },
    { id: "high", name: "High School (9-12)" },
    { id: "college", name: "College/University" },
    { id: "adult", name: "Adult Learners" },
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "subjects":
        if (!value || value.length === 0) {
          newErrors.subjects = "Please select at least one subject";
        } else {
          delete newErrors.subjects;
        }
        break;
      case "preferredGradeLevels":
        if (!value || value.length === 0) {
          newErrors.preferredGradeLevels =
            "Please select at least one grade level";
        } else {
          delete newErrors.preferredGradeLevels;
        }
        break;
      case "hasTutoredBefore":
        if (value === null || value === undefined) {
          newErrors.hasTutoredBefore = "Please select yes or no";
        } else {
          delete newErrors.hasTutoredBefore;
        }
        break;
      case "availability":
        if (!value || value.length === 0) {
          newErrors.availability = "Please add at least one availability slot";
        } else {
          delete newErrors.availability;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubjectChange = (subjectId, checked) => {
    const currentSubjects = formData.subjects || [];
    const newSubjects = checked
      ? [...currentSubjects, subjectId]
      : currentSubjects.filter((id) => id !== subjectId);

    setFormData({ ...formData, subjects: newSubjects });

    if (touched.subjects) {
      validateField("subjects", newSubjects);
    }
  };

  const handleGradeLevelChange = (gradeId, checked) => {
    const currentGrades = formData.preferredGradeLevels || [];
    const newGrades = checked
      ? [...currentGrades, gradeId]
      : currentGrades.filter((id) => id !== gradeId);

    setFormData({ ...formData, preferredGradeLevels: newGrades });

    if (touched.preferredGradeLevels) {
      validateField("preferredGradeLevels", newGrades);
    }
  };

  const handleTutoringExperienceChange = (value) => {
    setFormData({ ...formData, hasTutoredBefore: value === "true" });

    if (touched.hasTutoredBefore) {
      validateField("hasTutoredBefore", value === "true");
    }

    // Clear experience description if no previous tutoring
    if (value === "false") {
      setFormData((prev) => ({
        ...prev,
        hasTutoredBefore: false,
        tutoringExperience: null,
      }));
    }
  };

  const addAvailability = () => {
    if (
      !newAvailability.day ||
      !newAvailability.startTime ||
      !newAvailability.endTime
    ) {
      alert("Please fill all availability fields");
      return;
    }

    if (newAvailability.startTime >= newAvailability.endTime) {
      alert("End time must be after start time");
      return;
    }

    const availability = formData.availability || [];
    const exists = availability.some(
      (slot) =>
        slot.day === newAvailability.day &&
        slot.startTime === newAvailability.startTime
    );

    if (exists) {
      alert("This availability slot already exists");
      return;
    }

    const newAvailabilitySlots = [...availability, newAvailability];
    setFormData({ ...formData, availability: newAvailabilitySlots });
    setNewAvailability({ day: "", startTime: "", endTime: "" });

    if (touched.availability) {
      validateField("availability", newAvailabilitySlots);
    }
  };

  const removeAvailability = (index) => {
    const newAvailabilitySlots = formData.availability.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, availability: newAvailabilitySlots });

    if (touched.availability) {
      validateField("availability", newAvailabilitySlots);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };

  const validateAndNext = () => {
    const allTouched = {
      subjects: true,
      preferredGradeLevels: true,
      hasTutoredBefore: true,
      availability: true,
    };
    setTouched(allTouched);

    Object.keys(allTouched).forEach((field) => {
      validateField(field, formData[field]);
    });

    // Check if there are any errors after validation
    setTimeout(() => {
      const hasErrors = Object.keys(errors).length > 0;
      const hasEmptyRequiredFields =
        !formData.subjects?.length ||
        !formData.preferredGradeLevels?.length ||
        formData.hasTutoredBefore === null ||
        !formData.availability?.length;

      if (!hasErrors && !hasEmptyRequiredFields) {
        onNext();
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Experience & Skills
        </h2>
        <p className="text-gray-600">Tell us about your tutoring abilities</p>
      </div>

      <div className="space-y-6">
        {/* Subjects */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Subjects you can tutor <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {subjects.map((subject) => (
              <label
                key={subject.id}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={formData.subjects?.includes(subject.id) || false}
                  onChange={(e) =>
                    handleSubjectChange(subject.id, e.target.checked)
                  }
                  onBlur={() => handleBlur("subjects")}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{subject.name}</span>
              </label>
            ))}
          </div>
          {errors.subjects && touched.subjects && (
            <p className="text-red-500 text-sm">{errors.subjects}</p>
          )}
        </div>

        {/* Grade Levels */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Preferred grade levels <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {gradeLevels.map((grade) => (
              <label
                key={grade.id}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={
                    formData.preferredGradeLevels?.includes(grade.id) || false
                  }
                  onChange={(e) =>
                    handleGradeLevelChange(grade.id, e.target.checked)
                  }
                  onBlur={() => handleBlur("preferredGradeLevels")}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{grade.name}</span>
              </label>
            ))}
          </div>
          {errors.preferredGradeLevels && touched.preferredGradeLevels && (
            <p className="text-red-500 text-sm">
              {errors.preferredGradeLevels}
            </p>
          )}
        </div>

        {/* Tutoring Experience */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Have you tutored before? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasTutoredBefore"
                value="true"
                checked={formData.hasTutoredBefore === true}
                onChange={(e) => handleTutoringExperienceChange(e.target.value)}
                onBlur={() => handleBlur("hasTutoredBefore")}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasTutoredBefore"
                value="false"
                checked={formData.hasTutoredBefore === false}
                onChange={(e) => handleTutoringExperienceChange(e.target.value)}
                onBlur={() => handleBlur("hasTutoredBefore")}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {errors.hasTutoredBefore && touched.hasTutoredBefore && (
            <p className="text-red-500 text-sm">{errors.hasTutoredBefore}</p>
          )}
        </div>

        {/* Tutoring Experience Description */}
        {formData.hasTutoredBefore && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Describe your tutoring experience (optional)
            </label>
            <textarea
              value={formData.tutoringExperience || ""}
              onChange={(e) =>
                setFormData({ ...formData, tutoringExperience: e.target.value })
              }
              placeholder="Tell us about your previous tutoring experience, teaching methods, or any relevant achievements..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
          </div>
        )}

        {/* Availability */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Availability <span className="text-red-500">*</span>
          </label>

          {/* Add Availability Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <select
              value={newAvailability.day}
              onChange={(e) =>
                setNewAvailability({ ...newAvailability, day: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={newAvailability.startTime}
              onChange={(e) =>
                setNewAvailability({
                  ...newAvailability,
                  startTime: e.target.value,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="time"
              value={newAvailability.endTime}
              onChange={(e) =>
                setNewAvailability({
                  ...newAvailability,
                  endTime: e.target.value,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={addAvailability}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Availability List */}
          {formData.availability?.length > 0 && (
            <div className="space-y-2">
              {formData.availability.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{slot.day}</span>
                    <Clock className="w-4 h-4 text-gray-500 ml-2" />
                    <span className="text-sm">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAvailability(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.availability && touched.availability && (
            <p className="text-red-500 text-sm">{errors.availability}</p>
          )}
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

export default ExperienceSkillsStep;
