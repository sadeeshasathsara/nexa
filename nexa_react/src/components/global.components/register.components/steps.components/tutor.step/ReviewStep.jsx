/**
 * ReviewStep Component
 * --------------------
 * Step 7: Review all entered information before final submission
 *
 * FIELDS:
 *   - Display summary of all entered information (required for review)
 *   - Checkbox: "I confirm all information is accurate and I consent to background checks." (required)
 */

import React from "react";
import {
  Eye,
  User,
  Phone,
  Calendar,
  School,
  Shield,
  Award,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const ReviewStep = ({
  formData,
  setFormData,
  errors,
  setErrors,
  touched,
  setTouched,
  onNext,
  onPrev,
}) => {
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

  const getSubjectName = (id) => subjects.find((s) => s.id === id)?.name || id;
  const getGradeLevelName = (id) =>
    gradeLevels.find((g) => g.id === id)?.name || id;

  const handleConfirmationChange = (checked) => {
    setFormData({ ...formData, backgroundCheckConsent: checked });

    if (touched.backgroundCheckConsent) {
      const newErrors = { ...errors };
      if (!checked) {
        newErrors.backgroundCheckConsent =
          "You must consent to background checks to proceed";
      } else {
        delete newErrors.backgroundCheckConsent;
      }
      setErrors(newErrors);
    }
  };

  const validateAndNext = () => {
    setTouched({ ...touched, backgroundCheckConsent: true });

    const newErrors = { ...errors };
    if (!formData.backgroundCheckConsent) {
      newErrors.backgroundCheckConsent =
        "You must consent to background checks to proceed";
    } else {
      delete newErrors.backgroundCheckConsent;
    }
    setErrors(newErrors);

    if (formData.backgroundCheckConsent) {
      onNext();
    }
  };

  const InfoSection = ({ title, icon: Icon, children }) => (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, isList = false }) => (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-600 font-medium">{label}:</span>
      <span className="text-sm text-gray-800 text-right max-w-xs">
        {isList ? (
          <div className="space-y-1">
            {value?.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        ) : (
          value || "Not provided"
        )}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Review Your Information
        </h2>
        <p className="text-gray-600">
          Please review all information before submitting
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <InfoSection title="Personal Information" icon={User}>
          <div className="space-y-2">
            <InfoRow
              label="Name"
              value={`${formData.firstName} ${formData.lastName}`}
            />
            <InfoRow label="Email" value={formData.email} />
            <InfoRow label="Date of Birth" value={formData.dateOfBirth} />
            <InfoRow label="Phone Number" value={formData.phoneNumber} />
          </div>
        </InfoSection>

        {/* Education & Background */}
        <InfoSection title="Education & Background" icon={School}>
          <div className="space-y-2">
            <InfoRow
              label="Education Level"
              value={formData.educationLevel}
              isList
            />
            <InfoRow
              label="Government Teacher"
              value={formData.isGovernmentTeacher ? "Yes" : "No"}
            />
            {formData.isGovernmentTeacher && (
              <InfoRow label="School Name" value={formData.schoolName} />
            )}
            <InfoRow
              label="Languages"
              value={formData.languages?.map(
                (lang) => `${lang.language} (${lang.level})`
              )}
              isList
            />
          </div>
        </InfoSection>

        {/* Legal & Safety */}
        <InfoSection title="Legal & Safety Verification" icon={Shield}>
          <div className="space-y-2">
            <InfoRow
              label="Criminal Convictions"
              value={formData.hasConviction ? "Yes" : "No"}
            />
            <InfoRow
              label="Academic Sanctions"
              value={formData.hasAcademicSanctions ? "Yes" : "No"}
            />
            <InfoRow
              label="Background Check Consent"
              value={formData.agreesToBackgroundCheck ? "Yes" : "No"}
            />
            <InfoRow
              label="Information Certification"
              value={formData.certifiesInformationTrue ? "Yes" : "No"}
            />
            <InfoRow
              label="Platform-Only Tutoring"
              value={formData.understandsPlatformOnly ? "Yes" : "No"}
            />
            <InfoRow
              label="Volunteer Position"
              value={formData.understandsUnpaidPosition ? "Yes" : "No"}
            />
          </div>
        </InfoSection>

        {/* Skills & Experience */}
        <InfoSection title="Skills & Experience" icon={Award}>
          <div className="space-y-2">
            <InfoRow
              label="Subjects"
              value={formData.subjects?.map((id) => getSubjectName(id))}
              isList
            />
            <InfoRow
              label="Grade Levels"
              value={formData.preferredGradeLevels?.map((id) =>
                getGradeLevelName(id)
              )}
              isList
            />
            <InfoRow
              label="Previous Tutoring"
              value={formData.hasTutoredBefore ? "Yes" : "No"}
            />
            {formData.tutoringExperience && (
              <div className="pt-2">
                <span className="text-sm text-gray-600 font-medium">
                  Experience Description:
                </span>
                <p className="text-sm text-gray-800 mt-1 bg-white p-3 rounded-lg">
                  {formData.tutoringExperience}
                </p>
              </div>
            )}
            <InfoRow
              label="Availability"
              value={formData.availability?.map(
                (slot) => `${slot.day}: ${slot.startTime} - ${slot.endTime}`
              )}
              isList
            />
          </div>
        </InfoSection>

        {/* Motivation */}
        <InfoSection title="Motivation & Goals" icon={MessageSquare}>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-600 font-medium">
                Motivation Statement:
              </span>
              <p className="text-sm text-gray-800 mt-1 bg-white p-3 rounded-lg leading-relaxed">
                {formData.motivationStatement}
              </p>
            </div>
            {formData.resumePortfolioLink && (
              <InfoRow
                label="Resume/Portfolio"
                value={formData.resumePortfolioLink}
              />
            )}
          </div>
        </InfoSection>

        {/* Final Confirmation */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-3 flex-1">
              <div>
                <h4 className="font-medium text-yellow-800">
                  Final Confirmation Required
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Please confirm that all information above is accurate. Changes
                  may not be possible after submission.
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={formData.backgroundCheckConsent || false}
                    onChange={(e) => handleConfirmationChange(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                      formData.backgroundCheckConsent
                        ? "bg-yellow-600 border-yellow-600"
                        : "border-yellow-400 group-hover:border-yellow-500"
                    }`}
                  >
                    {formData.backgroundCheckConsent && (
                      <CheckCircle className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                </div>
                <span className="text-sm text-yellow-800 leading-relaxed">
                  I confirm that all information provided is accurate and
                  complete. I consent to background checks and understand that
                  false information may result in disqualification.
                </span>
              </label>

              {errors.backgroundCheckConsent &&
                touched.backgroundCheckConsent && (
                  <p className="text-red-500 text-sm">
                    {errors.backgroundCheckConsent}
                  </p>
                )}
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
          Continue to Final Step
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
