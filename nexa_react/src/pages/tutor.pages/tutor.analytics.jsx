import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Loader,
} from "lucide-react";

const TutorAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mock analytics data based on the provided documents
  const overviewStats = [
    {
      title: "Total Students",
      value: "6",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: "3",
      change: "+0%",
      trend: "neutral",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Avg. Completion",
      value: "67%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Avg. Quiz Score",
      value: "74%",
      change: "-3%",
      trend: "down",
      icon: Award,
      color: "bg-orange-500",
    },
  ];

  // Course performance data
  const coursePerformance = [
    {
      name: "Digital Marketing Course",
      enrolled: 6,
      active: 6,
      completed: 2,
      avgProgress: 35,
      avgScore: 30,
    },
    {
      name: "UI/UX Design Course",
      enrolled: 2,
      active: 2,
      completed: 8,
      avgProgress: 72,
      avgScore: 82,
    },
    {
      name: "English for Professionals",
      enrolled: 3,
      active: 42,
      completed: 1,
      avgProgress: 81,
      avgScore: 88,
    },
  ];

  // Student progress distribution
  const progressDistribution = [
    { name: "0-25%", students: 42, color: "#ef4444" },
    { name: "26-50%", students: 35, color: "#f97316" },
    { name: "51-75%", students: 48, color: "#3b82f6" },
    { name: "76-100%", students: 31, color: "#22c55e" },
  ];

  // Enrollment trends (last 6 months)
  const enrollmentTrends = [
    { month: "Sep", enrollments: 3, completions: 8 },
    { month: "Oct", enrollments: 0, completions: 0 },
    { month: "Nov", enrollments: 0, completions: 0 },
    { month: "Dec", enrollments: 0, completions: 0 },
    { month: "Jan", enrollments: 0, completions: 0 },
    { month: "Feb", enrollments: 0, completions: 0 },
  ];

  // Quiz performance data
  const quizPerformance = [
    {
      course: "UI/UX Design",
      lesson: "Design Principles",
      attempts: 28,
      avgScore: 82,
      passRate: 89,
    },
    {
      course: "Digital Marketing",
      lesson: "Email Campaigns",
      attempts: 15,
      avgScore: 76,
      passRate: 73,
    },
    {
      course: "English Pro",
      lesson: "Business Communication",
      attempts: 31,
      avgScore: 88,
      passRate: 94,
    },
  ];

  // Recent student activity
  const recentActivity = [
    {
      student: "Sanduni Perera",
      course: "UI/UX Design Course",
      action: "Completed lesson",
      lesson: "Design Principles",
      time: "5 min ago",
      type: "completion",
    },
    {
      student: "Kasun Wickramasinghe",
      course: "Digital Marketing Course",
      action: "Started quiz",
      lesson: "Email Marketing",
      time: "12 min ago",
      type: "quiz",
    },
    {
      student: "Nethmi Fernando",
      course: "English for Professionals",
      action: "Enrolled in course",
      lesson: null,
      time: "1 hour ago",
      type: "enrollment",
    },
    {
      student: "Tharindu Silva",
      course: "UI/UX Design Course",
      action: "Completed quiz",
      lesson: "User Research Methods",
      time: "2 hours ago",
      type: "completion",
    },
    {
      student: "Chamodi Rajapaksha",
      course: "Digital Marketing Course",
      action: "Failed quiz attempt",
      lesson: "SEO Basics",
      time: "3 hours ago",
      type: "warning",
    },
  ];

  // Time spent data
  const timeSpentData = [
    { day: "Mon", hours: 0 },
    { day: "Tue", hours: 0 },
    { day: "Wed", hours: 0 },
    { day: "Thu", hours: 0 },
    { day: "Fri", hours: 0.1 },
    { day: "Sat", hours: 0.4 },
    { day: "Sun", hours: 0.2 },
  ];

  const COLORS = ["#ef4444", "#f97316", "#3b82f6", "#22c55e"];

  // Simple Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Track your course performance and student progress
        </p>
      </div>

      {/* Period Selector */}
      <div className="mb-6 flex gap-2">
        {["week", "month", "quarter", "year"].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPeriod === period
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 transform transition-all hover:scale-105 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span
                className={`text-sm font-semibold ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Enrollment Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Enrollment Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Enrollments"
              />
              <Line
                type="monotone"
                dataKey="completions"
                stroke="#22c55e"
                strokeWidth={2}
                name="Completions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Student Progress Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={progressDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="students"
              >
                {progressDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Performance Table */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Course Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Course Name
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Enrolled
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Active
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Completed
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Avg Progress
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Avg Score
                </th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.map((course, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {course.name}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">
                    {course.enrolled}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-16 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {course.active}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-16 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {course.completed}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.avgProgress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {course.avgProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`font-semibold ${
                        course.avgScore >= 80
                          ? "text-green-600"
                          : course.avgScore >= 60
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {course.avgScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quiz Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Quiz Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quizPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgScore" fill="#3b82f6" name="Avg Score %" />
              <Bar dataKey="passRate" fill="#22c55e" name="Pass Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time Spent */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Student Time Spent (Hours)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeSpentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recent Student Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className={`p-2 rounded-lg ${
                  activity.type === "completion"
                    ? "bg-green-100"
                    : activity.type === "quiz"
                    ? "bg-blue-100"
                    : activity.type === "warning"
                    ? "bg-red-100"
                    : "bg-purple-100"
                }`}
              >
                {activity.type === "completion" ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : activity.type === "quiz" ? (
                  <Award className="text-blue-600" size={20} />
                ) : activity.type === "warning" ? (
                  <AlertCircle className="text-red-600" size={20} />
                ) : (
                  <Eye className="text-purple-600" size={20} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">
                    {activity.student}
                  </h4>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {activity.action} {activity.lesson && `- ${activity.lesson}`}
                </p>
                <p className="text-xs text-gray-500">{activity.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorAnalytics;
