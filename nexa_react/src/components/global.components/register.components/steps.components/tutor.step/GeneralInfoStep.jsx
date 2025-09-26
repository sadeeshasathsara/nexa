/**
 * GeneralInfoStep Component
 * -------------------------
 * Step 3: Collects general information for tutor registration
 *
 * FIELDS:
 *   - Date of Birth (required, validate age ≥17)
 *   - Phone Number (required, format validation)
 *   - Education Level (required, multi-select)
 *   - Government School Teacher (required, yes/no)
 *   - School Name (required if Government School Teacher is true)
 *   - Languages (required, array with language and level)
 */

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Phone,
  School,
  Languages,
  Plus,
  X,
  User,
} from "lucide-react";
import InputField from "../../tools.compoenents/inputField.component";

const GeneralInfoStep = ({
  formData,
  setFormData,
  errors,
  setErrors,
  touched,
  setTouched,
  onNext,
  onPrev,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState({
    language: "",
    level: "Fluent",
  });

  const educationLevels = [
    "High School",
    "College",
    "University",
    "Masters",
    "PhD",
    "Other",
  ];

  const languageLevels = ["Fluent", "Intermediate", "Basic"];
  const commonLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi",
    "Bengali",
    "Urdu",
    "Tamil",
    "Sinhala",
    "Russian",
    "Dutch",
    "Other",
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "dateOfBirth":
        if (!value) {
          newErrors.dateOfBirth = "Date of birth is required";
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          if (age < 17) {
            newErrors.dateOfBirth = "You must be at least 17 years old";
          } else {
            delete newErrors.dateOfBirth;
          }
        }
        break;
      case "phoneNumber":
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
        if (!value) {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          newErrors.phoneNumber = "Please enter a valid phone number";
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case "educationLevel":
        if (!value || value.length === 0) {
          newErrors.educationLevel =
            "Please select at least one education level";
        } else {
          delete newErrors.educationLevel;
        }
        break;
      case "isGovernmentTeacher":
        if (value === null || value === undefined) {
          newErrors.isGovernmentTeacher = "Please select yes or no";
        } else {
          delete newErrors.isGovernmentTeacher;
        }
        break;
      case "schoolName":
        if (formData.isGovernmentTeacher && !value) {
          newErrors.schoolName =
            "School name is required for government teachers";
        } else {
          delete newErrors.schoolName;
        }
        break;
      case "languages":
        if (!value || value.length === 0) {
          newErrors.languages = "Please add at least one language";
        } else {
          delete newErrors.languages;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === "checkbox") {
      if (name === "educationLevel") {
        const currentLevels = formData.educationLevel || [];
        newValue = checked
          ? [...currentLevels, value]
          : currentLevels.filter((level) => level !== value);
      } else {
        newValue = checked;
      }
    } else if (name === "isGovernmentTeacher") {
      newValue = value === "true";
    }

    setFormData({ ...formData, [name]: newValue });

    if (touched[name]) {
      validateField(name, newValue);
    }

    // Clear school name if not a government teacher
    if (name === "isGovernmentTeacher" && !newValue) {
      setFormData((prev) => ({ ...prev, [name]: newValue, schoolName: null }));
      if (errors.schoolName) {
        const newErrors = { ...errors };
        delete newErrors.schoolName;
        setErrors(newErrors);
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const addLanguage = () => {
    if (!currentLanguage.language.trim()) return;

    const languages = formData.languages || [];
    const exists = languages.some(
      (lang) =>
        lang.language.toLowerCase() === currentLanguage.language.toLowerCase()
    );

    if (exists) {
      alert("Language already added");
      return;
    }

    const newLanguages = [...languages, currentLanguage];
    setFormData({ ...formData, languages: newLanguages });
    setCurrentLanguage({ language: "", level: "Fluent" });

    if (touched.languages) {
      validateField("languages", newLanguages);
    }
  };

  const removeLanguage = (index) => {
    const newLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: newLanguages });

    if (touched.languages) {
      validateField("languages", newLanguages);
    }
  };

  const validateAndNext = () => {
    const allTouched = {
      dateOfBirth: true,
      phoneNumber: true,
      educationLevel: true,
      isGovernmentTeacher: true,
      schoolName: formData.isGovernmentTeacher,
      languages: true,
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
      const hasEmptyRequiredFields =
        !formData.dateOfBirth ||
        !formData.phoneNumber ||
        !formData.educationLevel?.length ||
        formData.isGovernmentTeacher === null ||
        (formData.isGovernmentTeacher && !formData.schoolName) ||
        !formData.languages?.length;

      if (!hasErrors && !hasEmptyRequiredFields) {
        onNext();
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">
          General Information
        </h2>
        <p className="text-gray-600">Tell us about your background</p>
      </div>

      <div className="space-y-4">
        {/* Date of Birth */}
        <InputField
          name="dateOfBirth"
          type="date"
          placeholder="Date of Birth"
          icon={Calendar}
          formData={formData}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          required
        />

        {/* Phone Number */}
        <InputField
          name="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          icon={Phone}
          formData={formData}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          required
        />

        {/* Education Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Education Level <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {educationLevels.map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name="educationLevel"
                  value={level}
                  checked={formData.educationLevel?.includes(level) || false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
          {errors.educationLevel && touched.educationLevel && (
            <p className="text-red-500 text-sm">{errors.educationLevel}</p>
          )}
        </div>

        {/* Government School Teacher */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Are you a government school teacher?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isGovernmentTeacher"
                value="true"
                checked={formData.isGovernmentTeacher === true}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isGovernmentTeacher"
                value="false"
                checked={formData.isGovernmentTeacher === false}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
          {errors.isGovernmentTeacher && touched.isGovernmentTeacher && (
            <p className="text-red-500 text-sm">{errors.isGovernmentTeacher}</p>
          )}
        </div>

        {/* School Name - Only show if government teacher */}
        {formData.isGovernmentTeacher && (
          <InputField
            name="schoolName"
            placeholder="School Name"
            icon={School}
            formData={formData}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required
          />
        )}

        {/* Languages */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Languages <span className="text-red-500">*</span>
          </label>

          {/* Add Language Form */}
          <div className="flex gap-2">
            <select
              value={currentLanguage.language}
              onChange={(e) =>
                setCurrentLanguage({
                  ...currentLanguage,
                  language: e.target.value,
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Language</option>
              {commonLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <select
              value={currentLanguage.level}
              onChange={(e) =>
                setCurrentLanguage({
                  ...currentLanguage,
                  level: e.target.value,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {languageLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addLanguage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Language List */}
          {formData.languages?.length > 0 && (
            <div className="space-y-2">
              {formData.languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                >
                  <span className="text-sm">
                    <span className="font-medium">{lang.language}</span> -{" "}
                    {lang.level}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.languages && touched.languages && (
            <p className="text-red-500 text-sm">{errors.languages}</p>
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

export default GeneralInfoStep;
