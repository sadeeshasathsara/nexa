import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  DollarSign,
  Star,
  Award,
  Target,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  BookMarked,
  Globe,
  Zap,
} from "lucide-react";
import {
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
} from "recharts";

function TutorDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    upcomingSessions: 0,
    pendingAssignments: 0,
    monthlyEarnings: 0,
    studentSatisfaction: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [earningsData, setEarningsData] = useState([]);
  const [studentProgressData, setStudentProgressData] = useState([]);
  const [courseDistribution, setCourseDistribution] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);

  // Mock data
  useEffect(() => {
    setStats({
      totalStudents: 247,
      activeCourses: 12,
      upcomingSessions: 8,
      pendingAssignments: 23,
      monthlyEarnings: 4850,
      studentSatisfaction: 4.9,
    });

    setRecentActivity([
      {
        id: 1,
        type: "assignment",
        message: "Sarah Wilson submitted Advanced Calculus Assignment",
        time: "5 minutes ago",
        status: "pending",
        icon: BookOpen,
      },
      {
        id: 2,
        type: "session",
        message: "Completed session with Michael Chen",
        time: "1 hour ago",
        status: "completed",
        icon: CheckCircle,
      },
      {
        id: 3,
        type: "message",
        message: "New message from Emma Rodriguez",
        time: "2 hours ago",
        status: "unread",
        icon: MessageSquare,
      },
      {
        id: 4,
        type: "achievement",
        message: "David Kim achieved 95% in Physics Fundamentals",
        time: "3 hours ago",
        status: "achievement",
        icon: Award,
      },
    ]);

    setUpcomingSessions([
      {
        id: 1,
        student: "Sarah Wilson",
        course: "Advanced Mathematics",
        time: "Today, 2:00 PM",
        duration: "60 mins",
        type: "Regular",
        avatar: "SW",
      },
      {
        id: 2,
        student: "Michael Chen",
        course: "Physics Fundamentals",
        time: "Today, 4:30 PM",
        duration: "45 mins",
        type: "Revision",
        avatar: "MC",
      },
      {
        id: 3,
        student: "Emma Rodriguez",
        course: "Calculus II",
        time: "Tomorrow, 10:00 AM",
        duration: "90 mins",
        type: "Exam Prep",
        avatar: "ER",
      },
    ]);

    setPerformanceMetrics({
      attendanceRate: 96,
      averageRating: 4.9,
      completionRate: 92,
      responseTime: "1.8 hours",
    });

    setEarningsData([
      { month: "Jan", earnings: 3200 },
      { month: "Feb", earnings: 3800 },
      { month: "Mar", earnings: 3600 },
      { month: "Apr", earnings: 4200 },
      { month: "May", earnings: 4600 },
      { month: "Jun", earnings: 4850 },
    ]);

    setStudentProgressData([
      { week: "Week 1", completed: 85, pending: 15 },
      { week: "Week 2", completed: 78, pending: 22 },
      { week: "Week 3", completed: 92, pending: 8 },
      { week: "Week 4", completed: 88, pending: 12 },
    ]);

    setCourseDistribution([
      { name: "Mathematics", value: 35, color: "#043345" },
      { name: "Physics", value: 25, color: "#0D9AAC" },
      { name: "Chemistry", value: 20, color: "#00B6C7" },
      { name: "Biology", value: 20, color: "#009966" },
    ]);

    setWeeklyActivity([
      { day: "Mon", sessions: 8, hours: 12 },
      { day: "Tue", sessions: 6, hours: 9 },
      { day: "Wed", sessions: 10, hours: 15 },
      { day: "Thu", sessions: 7, hours: 10 },
      { day: "Fri", sessions: 9, hours: 13 },
      { day: "Sat", sessions: 5, hours: 7 },
      { day: "Sun", sessions: 3, hours: 4 },
    ]);
  }, []);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    change,
    gradient,
    delay = 0,
  }) => (
    <div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`bg-gradient-to-r ${gradient} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div
            className={`flex items-center text-sm font-medium ${
              change > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${change < 0 ? "rotate-180" : ""}`}
            />
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
          {value}
        </p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const Icon = activity.icon;
    const getStatusStyle = (status) => {
      switch (status) {
        case "pending":
          return {
            bg: "bg-amber-50",
            text: "text-amber-600",
            border: "border-amber-200",
          };
        case "completed":
          return {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            border: "border-emerald-200",
          };
        case "unread":
          return {
            bg: "bg-blue-50",
            text: "text-blue-600",
            border: "border-blue-200",
          };
        case "achievement":
          return {
            bg: "bg-purple-50",
            text: "text-purple-600",
            border: "border-purple-200",
          };
        default:
          return {
            bg: "bg-gray-50",
            text: "text-gray-600",
            border: "border-gray-200",
          };
      }
    };

    const styles = getStatusStyle(activity.status);

    return (
      <div className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-0 group hover:bg-gray-50 rounded-lg px-2 transition-colors">
        <div
          className={`${styles.bg} ${styles.border} p-2.5 rounded-xl border group-hover:scale-105 transition-transform`}
        >
          <Icon className={`w-4 h-4 ${styles.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 mb-1">
            {activity.message}
          </p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#00FF99]/5">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00FF99] bg-clip-text text-transparent">
                  Dr. Sarah Johnson
                </span>
              </h1>
              <p className="text-gray-600 mt-2">
                Here's your teaching overview for today
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center">
                <PlayCircle className="w-5 h-5 mr-2" />
                Start New Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Students"
            value={stats.totalStudents}
            change={+12}
            gradient="from-[#043345] to-[#0D9AAC]"
            delay={0}
          />
          <StatCard
            icon={BookOpen}
            label="Active Courses"
            value={stats.activeCourses}
            change={+3}
            gradient="from-[#0D9AAC] to-[#00B6C7]"
            delay={100}
          />
          <StatCard
            icon={Clock}
            label="Upcoming Sessions"
            value={stats.upcomingSessions}
            change={-2}
            gradient="from-[#00B6C7] to-[#009966]"
            delay={200}
          />
          <StatCard
            icon={AlertTriangle}
            label="Pending Reviews"
            value={stats.pendingAssignments}
            change={+5}
            gradient="from-[#009966] to-[#00FF99]"
            delay={300}
          />
          <StatCard
            icon={DollarSign}
            label="Monthly Earnings"
            value={`$${stats.monthlyEarnings.toLocaleString()}`}
            change={+18}
            gradient="from-[#043345] to-[#009966]"
            delay={400}
          />
          <StatCard
            icon={Star}
            label="Rating"
            value={`${stats.studentSatisfaction}/5.0`}
            change={+0.2}
            gradient="from-[#00B6C7] to-[#00FF99]"
            delay={500}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {/* Earnings Trend */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] p-2 rounded-lg mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Earnings Trend
                  </h3>
                  <p className="text-sm text-gray-600">
                    Monthly earnings overview
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.monthlyEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-emerald-600">+18% this month</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient
                      id="earningsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#0D9AAC" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#0D9AAC"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#0D9AAC"
                    strokeWidth={3}
                    fill="url(#earningsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-[#00B6C7] to-[#009966] p-2 rounded-lg mr-3">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Course Distribution
                </h3>
                <p className="text-sm text-gray-600">Subject breakdown</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {courseDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Activity & Student Progress */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-[#009966] to-[#00FF99] p-2 rounded-lg mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Weekly Activity
                </h3>
                <p className="text-sm text-gray-600">
                  Sessions and hours taught
                </p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Bar dataKey="sessions" fill="#009966" radius={4} />
                  <Bar dataKey="hours" fill="#00B6C7" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-[#043345] to-[#00B6C7] p-2 rounded-lg mr-3">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Student Progress
                </h3>
                <p className="text-sm text-gray-600">Weekly completion rates</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#009966"
                    strokeWidth={3}
                    dot={{ fill: "#009966", r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="#0D9AAC"
                    strokeWidth={3}
                    dot={{ fill: "#0D9AAC", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] p-2 rounded-lg mr-3">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h2>
                  <p className="text-sm text-gray-600">
                    Latest updates from your classes
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              {recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-[#043345] to-[#009966] p-2 rounded-lg mr-3">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Today's Sessions
                  </h2>
                  <p className="text-sm text-gray-600">Upcoming classes</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-0 group hover:bg-gray-50 rounded-lg px-2 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {session.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">
                      {session.student}
                    </p>
                    <p className="text-xs text-gray-600">{session.course}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {session.time} • {session.duration}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.type === "Regular"
                        ? "bg-blue-100 text-blue-800"
                        : session.type === "Revision"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {session.type}
                  </span>
                </div>
              ))}
              <button className="w-full mt-4 text-center text-[#0D9AAC] hover:text-[#043345] text-sm font-medium transition-colors">
                View Full Schedule →
              </button>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#00B6C7] to-[#00FF99] p-2 rounded-lg mr-3">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Performance Overview
                </h2>
                <p className="text-sm text-gray-600">
                  Your teaching metrics at a glance
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#043345] to-[#0D9AAC] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {performanceMetrics.attendanceRate}%
              </div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {performanceMetrics.averageRating}/5.0
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00B6C7] to-[#009966] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookMarked className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {performanceMetrics.completionRate}%
              </div>
              <p className="text-sm text-gray-600">Course Completion</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#009966] to-[#00FF99] rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {performanceMetrics.responseTime}
              </div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00B6C7] rounded-2xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Quick Actions
            </h2>
            <p className="text-white/90">Streamline your teaching workflow</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
              <PlayCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium block">Start Session</span>
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
              <BookOpen className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium block">
                Grade Assignments
              </span>
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
              <Calendar className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium block">Schedule Class</span>
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
              <MessageSquare className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium block">Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;
