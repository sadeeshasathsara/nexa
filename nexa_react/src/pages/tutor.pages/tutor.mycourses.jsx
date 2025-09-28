import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Star,
  Calendar,
  Play,
  Pause,
  Edit,
  Eye,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Award,
  Target,
  DollarSign,
  Activity,
  CheckCircle,
  AlertCircle,
  BookMarked,
  FileText,
  Video,
  Download,
  Share,
  Settings,
  BarChart3,
  PieChart,
  Users2,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  // Mock data
  useEffect(() => {
    const coursesData = [
      {
        id: 1,
        title: "Advanced Mathematics",
        subject: "Mathematics",
        level: "Grade 12",
        status: "active",
        students: 45,
        totalSessions: 120,
        completedSessions: 95,
        rating: 4.9,
        earnings: 2850,
        nextSession: "Today, 2:00 PM",
        progress: 79,
        thumbnail: "📐",
        description:
          "Comprehensive course covering calculus, algebra, and advanced mathematical concepts for Grade 12 students.",
        topics: ["Calculus", "Linear Algebra", "Statistics", "Trigonometry"],
        startDate: "2024-01-15",
        duration: "6 months",
        price: 80,
        sessionType: "Online & In-Person",
        materials: ["Textbook PDF", "Practice Problems", "Video Lectures"],
        recentActivity: [
          {
            type: "session",
            message: "Completed session with Sarah Wilson",
            time: "2 hours ago",
          },
          {
            type: "assignment",
            message: "5 new assignments submitted",
            time: "1 day ago",
          },
        ],
      },
      {
        id: 2,
        title: "Physics Fundamentals",
        subject: "Physics",
        level: "Grade 11",
        status: "active",
        students: 32,
        totalSessions: 80,
        completedSessions: 68,
        rating: 4.8,
        earnings: 1920,
        nextSession: "Tomorrow, 10:00 AM",
        progress: 85,
        thumbnail: "⚡",
        description:
          "Essential physics concepts including mechanics, thermodynamics, and electromagnetism.",
        topics: ["Mechanics", "Thermodynamics", "Waves", "Electromagnetism"],
        startDate: "2024-02-01",
        duration: "5 months",
        price: 75,
        sessionType: "Online",
        materials: ["Lab Manual", "Simulation Software", "Formula Sheets"],
        recentActivity: [
          {
            type: "quiz",
            message: "New quiz results available",
            time: "3 hours ago",
          },
          {
            type: "session",
            message: "Upcoming lab session",
            time: "5 hours ago",
          },
        ],
      },
      {
        id: 3,
        title: "Organic Chemistry",
        subject: "Chemistry",
        level: "Grade 12",
        status: "active",
        students: 28,
        totalSessions: 60,
        completedSessions: 45,
        rating: 4.7,
        earnings: 1680,
        nextSession: "Mon, 3:00 PM",
        progress: 75,
        thumbnail: "🧪",
        description:
          "Deep dive into organic chemistry reactions, mechanisms, and molecular structures.",
        topics: [
          "Hydrocarbons",
          "Functional Groups",
          "Reactions",
          "Mechanisms",
        ],
        startDate: "2024-03-01",
        duration: "4 months",
        price: 85,
        sessionType: "In-Person",
        materials: ["Lab Equipment", "Molecular Models", "Reaction Charts"],
        recentActivity: [
          {
            type: "lab",
            message: "Lab report submissions due",
            time: "1 day ago",
          },
          {
            type: "announcement",
            message: "New lab safety guidelines",
            time: "2 days ago",
          },
        ],
      },
      {
        id: 4,
        title: "Biology Essentials",
        subject: "Biology",
        level: "Grade 10",
        status: "completed",
        students: 38,
        totalSessions: 100,
        completedSessions: 100,
        rating: 4.6,
        earnings: 2280,
        nextSession: null,
        progress: 100,
        thumbnail: "🧬",
        description:
          "Comprehensive biology course covering cell biology, genetics, and ecology.",
        topics: ["Cell Biology", "Genetics", "Evolution", "Ecology"],
        startDate: "2023-09-01",
        duration: "8 months",
        price: 70,
        sessionType: "Online & In-Person",
        materials: ["Digital Microscope", "Specimens", "Interactive Diagrams"],
        recentActivity: [
          {
            type: "completion",
            message: "Course completed successfully",
            time: "1 week ago",
          },
          {
            type: "certificate",
            message: "Certificates issued to students",
            time: "1 week ago",
          },
        ],
      },
      {
        id: 5,
        title: "Calculus Mastery",
        subject: "Mathematics",
        level: "Grade 12",
        status: "paused",
        students: 22,
        totalSessions: 90,
        completedSessions: 35,
        rating: 4.8,
        earnings: 1540,
        nextSession: null,
        progress: 39,
        thumbnail: "∫",
        description:
          "Advanced calculus course focusing on differential and integral calculus applications.",
        topics: ["Derivatives", "Integrals", "Applications", "Series"],
        startDate: "2024-01-20",
        duration: "6 months",
        price: 90,
        sessionType: "Online",
        materials: ["Graphing Calculator", "Problem Sets", "Video Tutorials"],
        recentActivity: [
          {
            type: "pause",
            message: "Course paused for holiday break",
            time: "2 weeks ago",
          },
          {
            type: "session",
            message: "Last session completed",
            time: "3 weeks ago",
          },
        ],
      },
      {
        id: 6,
        title: "Statistics & Probability",
        subject: "Mathematics",
        level: "Grade 11",
        status: "draft",
        students: 0,
        totalSessions: 0,
        completedSessions: 0,
        rating: 0,
        earnings: 0,
        nextSession: null,
        progress: 0,
        thumbnail: "📊",
        description:
          "Introduction to statistical concepts and probability theory with practical applications.",
        topics: [
          "Descriptive Statistics",
          "Probability",
          "Distributions",
          "Hypothesis Testing",
        ],
        startDate: "2024-04-01",
        duration: "5 months",
        price: 75,
        sessionType: "Online",
        materials: ["Statistical Software", "Data Sets", "Practice Problems"],
        recentActivity: [
          {
            type: "draft",
            message: "Course content being prepared",
            time: "3 days ago",
          },
          {
            type: "planning",
            message: "Curriculum outline completed",
            time: "1 week ago",
          },
        ],
      },
    ];

    setCourses(coursesData);
    setFilteredCourses(coursesData);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((course) => course.status === filterStatus);
    }

    if (filterSubject !== "all") {
      filtered = filtered.filter((course) => course.subject === filterSubject);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, filterStatus, filterSubject, courses]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Play className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "paused":
        return <Pause className="w-3 h-3" />;
      case "draft":
        return <FileText className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const subjects = [...new Set(courses.map((course) => course.subject))];

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Course Header */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00B6C7] h-24 flex items-center justify-center">
          <span className="text-4xl">{course.thumbnail}</span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
              course.status
            )} flex items-center`}
          >
            {getStatusIcon(course.status)}
            <span className="ml-1 capitalize">{course.status}</span>
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600">
              {course.level} • {course.subject}
            </p>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-[#0D9AAC]" />
            {course.students} Students
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2 text-[#00B6C7]" />
            {course.completedSessions}/{course.totalSessions} Sessions
          </div>
          {course.rating > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
              {course.rating}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-[#009966]" />$
            {course.earnings}
          </div>
        </div>

        {course.status !== "draft" && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {course.nextSession && (
          <div className="mb-4 p-3 bg-gradient-to-r from-[#00B6C7]/10 to-[#00FF99]/10 rounded-lg">
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-[#0D9AAC]" />
              Next: {course.nextSession}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setSelectedCourse(course);
              setShowCourseModal(true);
            }}
            className="flex items-center text-[#0D9AAC] hover:text-[#043345] text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-[#0D9AAC] hover:bg-gray-100 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-[#0D9AAC] hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CourseListItem = ({ course }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-xl flex items-center justify-center text-2xl">
            {course.thumbnail}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                {course.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                  course.status
                )} flex items-center`}
              >
                {getStatusIcon(course.status)}
                <span className="ml-1 capitalize">{course.status}</span>
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-[#0D9AAC]" />
                {course.students} Students
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1 text-[#00B6C7]" />
                {course.completedSessions}/{course.totalSessions} Sessions
              </div>
              {course.rating > 0 && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                  {course.rating}
                </div>
              )}
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-[#009966]" />$
                {course.earnings}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {course.status !== "draft" && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {course.progress}%
              </div>
              <div className="text-xs text-gray-600">Progress</div>
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedCourse(course);
                setShowCourseModal(true);
              }}
              className="px-4 py-2 bg-[#0D9AAC] text-white rounded-lg hover:bg-[#043345] transition-colors text-sm font-medium"
            >
              View Details
            </button>
            <button className="p-2 text-gray-400 hover:text-[#0D9AAC] hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#00FF99]/5">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My{" "}
                <span className="bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00FF99] bg-clip-text text-transparent">
                  Courses
                </span>
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track your teaching courses
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                New Course
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter((c) => c.status === "active").length}
                </p>
                <p className="text-sm text-gray-600">Active Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, c) => sum + c.students, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-[#00B6C7] to-[#009966] p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {courses
                    .reduce((sum, c) => sum + c.earnings, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Earnings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-[#009966] to-[#00FF99] p-3 rounded-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    courses
                      .filter((c) => c.rating > 0)
                      .reduce((sum, c) => sum + c.rating, 0) /
                      courses.filter((c) => c.rating > 0).length || 0
                  ).toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#0D9AAC] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#0D9AAC] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Activity className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {filteredCourses.map((course) =>
            viewMode === "grid" ? (
              <CourseCard key={course.id} course={course} />
            ) : (
              <CourseListItem key={course.id} course={course} />
            )
          )}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-xl flex items-center justify-center text-2xl">
                  {selectedCourse.thumbnail}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-gray-600">
                    {selectedCourse.level} • {selectedCourse.subject}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCourseModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Description
                    </h3>
                    <p className="text-gray-600">
                      {selectedCourse.description}
                    </p>
                  </div>

                  {/* Topics */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Topics Covered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-[#0D9AAC]/10 to-[#00B6C7]/10 text-[#043345] rounded-lg text-sm font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Course Materials
                    </h3>
                    <ul className="space-y-2">
                      {selectedCourse.materials.map((material, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <BookMarked className="w-4 h-4 mr-2 text-[#0D9AAC]" />
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {selectedCourse.recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-[#0D9AAC] rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {activity.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Course Stats */}
                <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">
                    Course Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="opacity-90">Students Enrolled</span>
                      <span className="font-semibold">
                        {selectedCourse.students}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Sessions Completed</span>
                      <span className="font-semibold">
                        {selectedCourse.completedSessions}/
                        {selectedCourse.totalSessions}
                      </span>
                    </div>
                    {selectedCourse.rating > 0 && (
                      <div className="flex justify-between">
                        <span className="opacity-90">Average Rating</span>
                        <span className="font-semibold flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-current text-yellow-300" />
                          {selectedCourse.rating}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="opacity-90">Total Earnings</span>
                      <span className="font-semibold">
                        ${selectedCourse.earnings}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Session Price</span>
                      <span className="font-semibold">
                        ${selectedCourse.price}/session
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Course Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Start Date
                      </label>
                      <p className="text-gray-900">
                        {new Date(
                          selectedCourse.startDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Duration
                      </label>
                      <p className="text-gray-900">{selectedCourse.duration}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Session Type
                      </label>
                      <p className="text-gray-900">
                        {selectedCourse.sessionType}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Status
                      </label>
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          selectedCourse.status
                        )} mt-1`}
                      >
                        {getStatusIcon(selectedCourse.status)}
                        <span className="ml-1 capitalize">
                          {selectedCourse.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                {selectedCourse.status !== "draft" && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Progress
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Course Completion</span>
                        <span className="font-medium text-gray-900">
                          {selectedCourse.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] h-3 rounded-full transition-all duration-300"
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        {selectedCourse.completedSessions} of{" "}
                        {selectedCourse.totalSessions} sessions completed
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-[#0D9AAC] text-white rounded-lg hover:bg-[#043345] transition-colors">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Session
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Students
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <FileText className="w-4 h-4 mr-2" />
                      View Assignments
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Settings className="w-4 h-4 mr-2" />
                      Course Settings
                    </button>
                  </div>
                </div>

                {/* Share Options */}
                <div className="bg-gradient-to-r from-[#00B6C7]/10 to-[#00FF99]/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Share Course
                  </h3>
                  <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share Link
                    </button>
                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowCourseModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCourses;
