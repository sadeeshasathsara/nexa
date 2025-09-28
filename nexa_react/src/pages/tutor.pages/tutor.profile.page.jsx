// pages/tutor.pages/tutor.profile.page.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Phone,
  GraduationCap,
  BookOpen,
  Clock,
  Languages,
  School,
  Award,
  Github,
  Edit3,
  Save,
  X,
  Settings,
  LogOut,
  AlertCircle,
  Loader,
  MapPin,
  Briefcase,
} from "lucide-react";

// Compact Profile Card Component
const CompactProfileCard = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#043345] via-[#0D9AAC] to-[#00B6C7] rounded-xl text-white h-fit sticky top-8">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h2 className="text-lg font-semibold">Profile</h2>
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300"
            disabled={saving}
          >
            <Edit3 className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onSave}
              disabled={saving}
              className="bg-green-500 hover:bg-green-600 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {saving ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={saving}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="text-center space-y-3">
          {!isEditing ? (
            <>
              <h3 className="text-xl font-bold">
                {tutorData.firstName} {tutorData.lastName}
              </h3>
              <p className="text-white/90 text-sm">
                {tutorData.education.certification}
              </p>
              <p className="text-white/80 text-xs">{tutorData.email}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <Phone className="w-3 h-3 mr-2" />
                  <span>{tutorData.phoneNumber}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>Age: {tutorData.age}</span>
                </div>
                <div className="flex items-center justify-center">
                  <School className="w-3 h-3 mr-2" />
                  <span>{tutorData.schoolName}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={editData.phoneNumber || ""}
                onChange={(e) =>
                  setEditData({ ...editData, phoneNumber: e.target.value })
                }
                className="w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-center text-sm"
                placeholder="Phone Number"
              />
              <input
                type="number"
                value={editData.age || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    age: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-xs text-center"
                placeholder="Age"
              />
              <input
                type="text"
                value={editData.schoolName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, schoolName: e.target.value })
                }
                className="w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-xs text-center"
                placeholder="School Name"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-white/20 p-4 space-y-2">
        <button className="w-full flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-xs">
          <Settings className="w-3 h-3 mr-2" />
          Settings
        </button>
        <button
          onClick={() => {
            // Handle logout - clear cookies and redirect
            document.cookie =
              "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/v1/login";
          }}
          className="w-full flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-red-500/20 rounded-lg transition-all duration-300 text-xs hover:text-red-200"
        >
          <LogOut className="w-3 h-3 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

// Section Components
const AboutSection = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <User className="w-5 h-5 mr-2 text-[#043345]" />
        About
      </h2>
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="text-[#043345] hover:text-[#0D9AAC] p-2 rounded-lg transition-all duration-300"
          disabled={saving}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-green-600 hover:text-green-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>

    {!isEditing ? (
      <p className="text-gray-600 leading-relaxed">{tutorData.about}</p>
    ) : (
      <textarea
        value={editData.about || ""}
        onChange={(e) => setEditData({ ...editData, about: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 resize-none"
        rows="4"
        placeholder="Tell us about yourself..."
      />
    )}
  </div>
);

const EducationSection = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <GraduationCap className="w-5 h-5 mr-2 text-[#043345]" />
        Education & Certification
      </h2>
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="text-[#043345] hover:text-[#0D9AAC] p-2 rounded-lg transition-all duration-300"
          disabled={saving}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-green-600 hover:text-green-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>

    {!isEditing ? (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Degree:</span>
          <span className="text-gray-600">{tutorData.education.degree}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Education Level:</span>
          <span className="text-gray-600">{tutorData.education.level}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Certification:</span>
          <span className="text-gray-600">
            {tutorData.education.certification}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Workplace:</span>
          <span className="text-gray-600">{tutorData.education.workplace}</span>
        </div>
      </div>
    ) : (
      <div className="space-y-3">
        <input
          type="text"
          value={editData.education?.degree || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              education: { ...editData.education, degree: e.target.value },
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
          placeholder="Degree"
        />
        <input
          type="text"
          value={editData.education?.level || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              education: { ...editData.education, level: e.target.value },
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
          placeholder="Education Level"
        />
        <input
          type="text"
          value={editData.education?.certification || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              education: {
                ...editData.education,
                certification: e.target.value,
              },
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
          placeholder="Certification"
        />
        <input
          type="text"
          value={editData.education?.workplace || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              education: { ...editData.education, workplace: e.target.value },
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
          placeholder="Workplace"
        />
      </div>
    )}
  </div>
);

const ExperienceSection = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <Briefcase className="w-5 h-5 mr-2 text-[#043345]" />
        Teaching Experience
      </h2>
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="text-[#043345] hover:text-[#0D9AAC] p-2 rounded-lg transition-all duration-300"
          disabled={saving}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-green-600 hover:text-green-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>

    {!isEditing ? (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Status:</span>
          <span className="text-gray-600">{tutorData.experience.status}</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="font-medium block mb-2">Description:</span>
          <p className="text-gray-600">{tutorData.experience.description}</p>
        </div>
      </div>
    ) : (
      <div className="space-y-3">
        <input
          type="text"
          value={editData.experience?.status || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              experience: { ...editData.experience, status: e.target.value },
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
          placeholder="Experience Status"
        />
        <textarea
          value={editData.experience?.description || ""}
          onChange={(e) =>
            setEditData({
              ...editData,
              experience: {
                ...editData.experience,
                description: e.target.value,
              },
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 resize-none"
          rows="3"
          placeholder="Experience Description"
        />
      </div>
    )}
  </div>
);

const SubjectsSection = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <BookOpen className="w-5 h-5 mr-2 text-[#043345]" />
        Subjects
      </h2>
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="text-[#043345] hover:text-[#0D9AAC] p-2 rounded-lg transition-all duration-300"
          disabled={saving}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-green-600 hover:text-green-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>

    {!isEditing ? (
      <div className="flex flex-wrap gap-2">
        {tutorData.subjects.map((subject, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
          >
            {subject}
          </span>
        ))}
      </div>
    ) : (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {editData.subjects?.map((subject, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center"
            >
              {subject}
              <button
                type="button"
                onClick={() => {
                  const newSubjects = editData.subjects.filter(
                    (_, i) => i !== index
                  );
                  setEditData({ ...editData, subjects: newSubjects });
                }}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            id="newSubject"
            className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-700"
            placeholder="Add a subject"
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById("newSubject");
              const newSubject = input.value.trim();
              if (newSubject && !editData.subjects?.includes(newSubject)) {
                setEditData({
                  ...editData,
                  subjects: [...(editData.subjects || []), newSubject],
                });
                input.value = "";
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    )}
  </div>
);

const LanguagesSection = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <Languages className="w-5 h-5 mr-2 text-[#043345]" />
        Languages
      </h2>
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="text-[#043345] hover:text-[#0D9AAC] p-2 rounded-lg transition-all duration-300"
          disabled={saving}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-green-600 hover:text-green-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>

    {!isEditing ? (
      <div className="space-y-3">
        {tutorData.languages.map((lang, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="font-medium">{lang.language}</span>
            <span className="text-gray-600">{lang.level}</span>
          </div>
        ))}
      </div>
    ) : (
      <div className="space-y-3">
        {editData.languages?.map((lang, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={lang.language}
              onChange={(e) => {
                const newLanguages = [...editData.languages];
                newLanguages[index].language = e.target.value;
                setEditData({ ...editData, languages: newLanguages });
              }}
              className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-700"
              placeholder="Language"
            />
            <select
              value={lang.level}
              onChange={(e) => {
                const newLanguages = [...editData.languages];
                newLanguages[index].level = e.target.value;
                setEditData({ ...editData, languages: newLanguages });
              }}
              className="border border-gray-300 rounded-lg p-2 text-gray-700"
            >
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
            <button
              type="button"
              onClick={() => {
                const newLanguages = editData.languages.filter(
                  (_, i) => i !== index
                );
                setEditData({ ...editData, languages: newLanguages });
              }}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setEditData({
              ...editData,
              languages: [
                ...(editData.languages || []),
                { language: "", level: "Basic" },
              ],
            });
          }}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-700"
        >
          + Add Language
        </button>
      </div>
    )}
  </div>
);

const AvailabilitySection = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => (
  <div className="border-b border-gray-200 pb-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-[#043345]" />
        Availability
      </h2>
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="text-[#043345] hover:text-[#0D9AAC] p-2 rounded-lg transition-all duration-300"
          disabled={saving}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-green-600 hover:text-green-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>

    {!isEditing ? (
      <div className="space-y-3">
        {tutorData.availability.map((slot, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="font-medium">{slot.day}</span>
            <span className="text-gray-600">
              {slot.startTime} - {slot.endTime}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <div className="space-y-3">
        {editData.availability?.map((slot, index) => (
          <div key={index} className="flex gap-2 items-center">
            <select
              value={slot.day}
              onChange={(e) => {
                const newAvailability = [...editData.availability];
                newAvailability[index].day = e.target.value;
                setEditData({ ...editData, availability: newAvailability });
              }}
              className="border border-gray-300 rounded-lg p-2 text-gray-700"
            >
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) => {
                const newAvailability = [...editData.availability];
                newAvailability[index].startTime = e.target.value;
                setEditData({ ...editData, availability: newAvailability });
              }}
              className="border border-gray-300 rounded-lg p-2 text-gray-700"
            />
            <span>to</span>
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) => {
                const newAvailability = [...editData.availability];
                newAvailability[index].endTime = e.target.value;
                setEditData({ ...editData, availability: newAvailability });
              }}
              className="border border-gray-300 rounded-lg p-2 text-gray-700"
            />
            <button
              type="button"
              onClick={() => {
                const newAvailability = editData.availability.filter(
                  (_, i) => i !== index
                );
                setEditData({ ...editData, availability: newAvailability });
              }}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setEditData({
              ...editData,
              availability: [
                ...(editData.availability || []),
                { day: "Monday", startTime: "09:00", endTime: "17:00" },
              ],
            });
          }}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-700"
        >
          + Add Time Slot
        </button>
      </div>
    )}
  </div>
);

const ResumeSection = ({
  tutorData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => (
  <div className="pb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <Github className="w-5 h-5 mr-2 text-[#043345]" />
        Resume & Portfolio
      </h2>
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="text-[#043345] hover:text-[#0D9AAC] p-2 rounded-lg transition-all duration-300"
          disabled={saving}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="text-green-600 hover:text-green-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>

    {!isEditing ? (
      <a
        href={tutorData.resumePortfolioLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
      >
        <Github className="w-4 h-4 mr-2" />
        View Portfolio
      </a>
    ) : (
      <input
        type="url"
        value={editData.resumePortfolioLink || ""}
        onChange={(e) =>
          setEditData({ ...editData, resumePortfolioLink: e.target.value })
        }
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
        placeholder="Portfolio URL"
      />
    )}
  </div>
);

// Main Content Card Component
const MainContentCard = ({
  tutorData,
  editingSection,
  onEdit,
  onSave,
  onCancel,
  editData,
  setEditData,
  saving,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <AboutSection
        tutorData={tutorData}
        isEditing={editingSection === "about"}
        onEdit={() => onEdit("about")}
        onSave={() => onSave("about")}
        onCancel={onCancel}
        editData={editData}
        setEditData={setEditData}
        saving={saving}
      />

      <EducationSection
        tutorData={tutorData}
        isEditing={editingSection === "education"}
        onEdit={() => onEdit("education")}
        onSave={() => onSave("education")}
        onCancel={onCancel}
        editData={editData}
        setEditData={setEditData}
        saving={saving}
      />

      <ExperienceSection
        tutorData={tutorData}
        isEditing={editingSection === "experience"}
        onEdit={() => onEdit("experience")}
        onSave={() => onSave("experience")}
        onCancel={onCancel}
        editData={editData}
        setEditData={setEditData}
        saving={saving}
      />

      <SubjectsSection
        tutorData={tutorData}
        isEditing={editingSection === "subjects"}
        onEdit={() => onEdit("subjects")}
        onSave={() => onSave("subjects")}
        onCancel={onCancel}
        editData={editData}
        setEditData={setEditData}
        saving={saving}
      />

      <LanguagesSection
        tutorData={tutorData}
        isEditing={editingSection === "languages"}
        onEdit={() => onEdit("languages")}
        onSave={() => onSave("languages")}
        onCancel={onCancel}
        editData={editData}
        setEditData={setEditData}
        saving={saving}
      />

      <AvailabilitySection
        tutorData={tutorData}
        isEditing={editingSection === "availability"}
        onEdit={() => onEdit("availability")}
        onSave={() => onSave("availability")}
        onCancel={onCancel}
        editData={editData}
        setEditData={setEditData}
        saving={saving}
      />

      <ResumeSection
        tutorData={tutorData}
        isEditing={editingSection === "resume"}
        onEdit={() => onEdit("resume")}
        onSave={() => onSave("resume")}
        onCancel={onCancel}
        editData={editData}
        setEditData={setEditData}
        saving={saving}
      />
    </div>
  );
};

// Main Profile Page Component
const TutorProfilePage = () => {
  const [tutorData, setTutorData] = useState({
    firstName: "Eric",
    lastName: "Devon",
    email: "ericdevon@example.com",
    phoneNumber: "0785645398",
    age: 22,
    schoolName: "Kattuwa",
    about:
      "Passionate government school teacher specializing in mathematics education. Dedicated to helping students understand complex mathematical concepts through simplified teaching methods and personalized attention.",
    education: {
      degree: "High School Graduate",
      level: "High School",
      certification: "Government Certified Teacher",
      workplace: "Currently teaching at Kattuwa School",
    },
    experience: {
      status: "New to Online Tutoring",
      description:
        "Fresh start in online tutoring with government teaching background",
    },
    subjects: ["Math"],
    languages: [{ language: "Urdu", level: "Fluent" }],
    availability: [{ day: "Wednesday", startTime: "18:55", endTime: "20:55" }],
    resumePortfolioLink: "https://github.com/Eric-Devon",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (section) => {
    setEditingSection(section);
    setEditData({ ...tutorData });
  };

  const handleSave = async (section) => {
    try {
      setSaving(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the tutor data with edited data
      setTutorData(editData);
      setEditingSection(null);
      setEditData({});
    } catch (err) {
      setError(err.message);
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditData({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CompactProfileCard
              tutorData={tutorData}
              isEditing={editingSection === "profile"}
              onEdit={() => handleEdit("profile")}
              onSave={() => handleSave("profile")}
              onCancel={handleCancel}
              editData={editData}
              setEditData={setEditData}
              saving={saving}
            />
          </div>

          <div className="lg:col-span-3">
            <MainContentCard
              tutorData={tutorData}
              editingSection={editingSection}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              editData={editData}
              setEditData={setEditData}
              saving={saving}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;
