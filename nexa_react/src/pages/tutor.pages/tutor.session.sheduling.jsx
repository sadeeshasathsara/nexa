import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Plus,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Video,
  User,
  Bell,
  Repeat,
  AlertCircle,
  Save,
  Send,
} from "lucide-react";

function SessionScheduling() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sessionType, setSessionType] = useState("regular");
  const [sessionMode, setSessionMode] = useState("online");
  const [duration, setDuration] = useState(60);
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPattern, setRecurringPattern] = useState("weekly");
  const [reminderTime, setReminderTime] = useState(15);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Mock data
  useEffect(() => {
    setStudents([
      {
        id: 1,
        name: "Sarah Wilson",
        avatar: "SW",
        course: "Advanced Mathematics",
        level: "Grade 12",
        lastSession: "2 days ago",
        status: "active",
      },
      {
        id: 2,
        name: "Michael Chen",
        avatar: "MC",
        course: "Physics Fundamentals",
        level: "Grade 11",
        lastSession: "1 week ago",
        status: "active",
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        avatar: "ER",
        course: "Calculus II",
        level: "Grade 12",
        lastSession: "3 days ago",
        status: "active",
      },
      {
        id: 4,
        name: "David Kim",
        avatar: "DK",
        course: "Chemistry",
        level: "Grade 10",
        lastSession: "5 days ago",
        status: "active",
      },
      {
        id: 5,
        name: "Lisa Zhang",
        avatar: "LZ",
        course: "Biology",
        level: "Grade 11",
        lastSession: "1 day ago",
        status: "active",
      },
    ]);

    setSubjects([
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Calculus",
      "Algebra",
      "Geometry",
      "Statistics",
    ]);

    setBookedSlots([
      { date: new Date().toDateString(), time: "10:00" },
      { date: new Date().toDateString(), time: "14:30" },
    ]);

    // Generate time slots from 9 AM to 9 PM
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(time);
      }
    }
    setAvailableTimeSlots(slots);
  }, []);

  // Calendar functionality
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isSlotBooked = (time) => {
    return bookedSlots.some(
      (slot) => slot.date === selectedDate.toDateString() && slot.time === time
    );
  };

  const handleScheduleSession = () => {
    if (!selectedStudent || !selectedTimeSlot || !subject) {
      alert("Please fill in all required fields");
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSchedule = () => {
    // Here you would typically send the data to your backend
    console.log("Session scheduled:", {
      student: selectedStudent,
      date: selectedDate,
      time: selectedTimeSlot,
      subject,
      duration,
      sessionType,
      sessionMode,
      notes,
      isRecurring,
      recurringPattern,
      reminderTime,
    });

    // Reset form
    setSelectedStudent(null);
    setSelectedTimeSlot(null);
    setSubject("");
    setNotes("");
    setShowConfirmation(false);

    // Add to booked slots
    setBookedSlots([
      ...bookedSlots,
      { date: selectedDate.toDateString(), time: selectedTimeSlot },
    ]);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#00FF99]/5">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Schedule{" "}
                <span className="bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00FF99] bg-clip-text text-transparent">
                  New Session
                </span>
              </h1>
              <p className="text-gray-600 mt-2">
                Plan and organize your teaching sessions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleScheduleSession}
                className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] p-2 rounded-lg mr-3">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Select Date
                  </h2>
                </div>
              </div>

              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() =>
                    setSelectedDate(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() - 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[selectedDate.getMonth()]}{" "}
                  {selectedDate.getFullYear()}
                </h3>
                <button
                  onClick={() =>
                    setSelectedDate(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() + 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(selectedDate).map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && setSelectedDate(new Date(day))}
                    disabled={!day || day < new Date().setHours(0, 0, 0, 0)}
                    className={`
                      p-2 text-sm rounded-lg transition-all duration-200
                      ${!day ? "invisible" : ""}
                      ${
                        day && day < new Date().setHours(0, 0, 0, 0)
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }
                      ${
                        day &&
                        day.toDateString() === selectedDate.toDateString()
                          ? "bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] text-white font-semibold"
                          : "text-gray-900"
                      }
                    `}
                  >
                    {day && day.getDate()}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#00B6C7]/10 to-[#00FF99]/10 rounded-xl">
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-[#0D9AAC]" />
                  Selected: {formatDate(selectedDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="xl:col-span-2 space-y-8">
            {/* Time Slots */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] p-2 rounded-lg mr-3">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Available Time Slots
                </h2>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {availableTimeSlots.map((time) => {
                  const isBooked = isSlotBooked(time);
                  const isSelected = selectedTimeSlot === time;

                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && setSelectedTimeSlot(time)}
                      disabled={isBooked}
                      className={`
                        p-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isBooked
                            ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-200"
                            : isSelected
                            ? "bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] text-white shadow-lg"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-[#0D9AAC]"
                        }
                      `}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#00B6C7] to-[#009966] p-2 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Select Student
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${
                        selectedStudent?.id === student.id
                          ? "border-[#0D9AAC] bg-gradient-to-r from-[#0D9AAC]/5 to-[#00B6C7]/5"
                          : "border-gray-200 hover:border-[#0D9AAC] hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-full flex items-center justify-center text-white font-semibold">
                        {student.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {student.course}
                        </p>
                        <p className="text-xs text-gray-500">{student.level}</p>
                      </div>
                      {selectedStudent?.id === student.id && (
                        <Check className="w-5 h-5 text-[#0D9AAC]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#009966] to-[#00FF99] p-2 rounded-lg mr-3">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Session Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                    <option value={120}>120 minutes</option>
                  </select>
                </div>

                {/* Session Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <div className="flex space-x-4">
                    {[
                      { value: "regular", label: "Regular" },
                      { value: "revision", label: "Revision" },
                      { value: "exam-prep", label: "Exam Prep" },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSessionType(type.value)}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          ${
                            sessionType === type.value
                              ? "bg-[#0D9AAC] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }
                        `}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Mode
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSessionMode("online")}
                      className={`
                        flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          sessionMode === "online"
                            ? "bg-[#0D9AAC] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Online
                    </button>
                    <button
                      onClick={() => setSessionMode("in-person")}
                      className={`
                        flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          sessionMode === "in-person"
                            ? "bg-[#0D9AAC] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      In-Person
                    </button>
                  </div>
                </div>
              </div>

              {/* Recurring Sessions */}
              <div className="mt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 text-[#0D9AAC] border-gray-300 rounded focus:ring-[#0D9AAC]"
                  />
                  <label
                    htmlFor="recurring"
                    className="text-sm font-medium text-gray-700 flex items-center"
                  >
                    <Repeat className="w-4 h-4 mr-2" />
                    Make this a recurring session
                  </label>
                </div>

                {isRecurring && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Repeat Pattern
                      </label>
                      <select
                        value={recurringPattern}
                        onChange={(e) => setRecurringPattern(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Reminder */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Reminder (minutes before)
                  </label>
                  <select
                    value={reminderTime}
                    onChange={(e) => setReminderTime(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add any specific topics, materials needed, or special instructions..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Session Summary */}
        {(selectedStudent || selectedTimeSlot || subject) && (
          <div className="mt-8 bg-gradient-to-r from-[#043345] to-[#0D9AAC] rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Session Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Student</p>
                <p className="font-semibold">
                  {selectedStudent?.name || "Not selected"}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Date & Time</p>
                <p className="font-semibold">
                  {selectedTimeSlot
                    ? `${selectedDate.toLocaleDateString()} at ${selectedTimeSlot}`
                    : "Not selected"}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Subject</p>
                <p className="font-semibold">{subject || "Not selected"}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Duration</p>
                <p className="font-semibold">{duration} minutes</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                Confirm Session
              </h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-medium">{selectedStudent.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subject:</span>
                <span className="font-medium">{subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {selectedDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mode:</span>
                <span className="font-medium capitalize">
                  {sessionMode.replace("-", " ")}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSchedule}
                className="flex-1 bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionScheduling;
