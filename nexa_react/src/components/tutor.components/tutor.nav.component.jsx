import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Calendar,
  ClipboardList,
  Users,
  BarChart3,
  Bell,
  MessageSquare,
  User,
  Settings,
  DollarSign,
  HelpCircle,
  LogOut,
  MoreHorizontal,
} from "lucide-react";
import logo from "../../assets/global.assets/logo3.png";

const TutorTopNav = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");

  const notificationRef = useRef(null);
  const messageRef = useRef(null);
  const profileRef = useRef(null);
  const moreRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    // This forces a full page request and reload to the new URL.
    window.location.href = "/v1/tutor/courses";
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Dashboard", icon: BookOpen, path: "dashboard" },
    { name: "Schedule", icon: Calendar, path: "schedule" },
    { name: "Assignments", icon: ClipboardList, path: "assignments" },
    { name: "Students", icon: Users, path: "students" },
    { name: "Analytics", icon: BarChart3, path: "analytics" },
  ];

  const notifications = [
    {
      id: 1,
      message: "New assignment submission from John Doe",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      message: "Upcoming class: Advanced Math in 30 minutes",
      time: "10 min ago",
      unread: true,
    },
    {
      id: 3,
      message: "Student question in Programming 101",
      time: "1 hour ago",
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      message: "Can you help with the homework?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Mike Johnson",
      message: "Thank you for the explanation!",
      time: "15 min ago",
      unread: false,
    },
    {
      id: 3,
      sender: "Emma Davis",
      message: "When is the next quiz?",
      time: "1 hour ago",
      unread: true,
    },
  ];

  const profileMenuItems = [
    { name: "My Profile", icon: User },
    { name: "Settings", icon: Settings },
    { name: "Earnings", icon: DollarSign },
    { name: "Help & Support", icon: HelpCircle },
    { name: "Logout", icon: LogOut, divider: true },
  ];

  const unreadNotifications = notifications.filter((n) => n.unread).length;
  const unreadMessages = messages.filter((m) => m.unread).length;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <div
              className="h-15 w-[200px] flex items-center cursor-pointer"
              onClick={handleClick}
            >
              <img
                src={logo}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Main Navigation Links (desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNavItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveNavItem(item.name);
                    navigate(item.path); // Add this line
                  }}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#043345]/10 to-[#0D9AAC]/10 text-[#043345] border border-[#0D9AAC]/20"
                      : "text-gray-600 hover:text-[#0D9AAC] hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 mr-2 ${
                      isActive ? "text-[#0D9AAC]" : ""
                    }`}
                  />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Side - Actions & Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications - desktop only */}
            <div className="relative hidden md:block" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-[#0D9AAC] hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#00B6C7] to-[#009966] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-2 ${
                          notification.unread
                            ? "border-[#0D9AAC] bg-[#0D9AAC]/5"
                            : "border-transparent"
                        }`}
                      >
                        <p className="text-sm text-gray-800 mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-[#0D9AAC] hover:text-[#043345] font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Messages - desktop only */}
            <div className="relative hidden md:block" ref={messageRef}>
              <button
                onClick={() => setShowMessages(!showMessages)}
                className="relative p-2 text-gray-600 hover:text-[#0D9AAC] hover:bg-gray-50 rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#00B6C7] to-[#009966] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadMessages}
                  </span>
                )}
              </button>

              {showMessages && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Messages</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-2 ${
                          message.unread
                            ? "border-[#0D9AAC] bg-[#0D9AAC]/5"
                            : "border-transparent"
                        }`}
                      >
                        <p className="font-medium text-sm text-gray-900 mb-1">
                          {message.sender}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          {message.message}
                        </p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-[#0D9AAC] hover:text-[#043345] font-medium">
                      View all messages
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* More menu - mobile only */}
            <div className="relative md:hidden" ref={moreRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-2 text-gray-600 hover:text-[#0D9AAC] hover:bg-gray-50 rounded-lg transition-colors"
                aria-expanded={showMoreMenu}
                aria-label="Open more actions"
              >
                <MoreHorizontal className="w-6 h-6" />
              </button>

              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {/* Nav items */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Navigation</h3>
                    <div className="mt-2 space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNavItem === item.name;
                        return (
                          <button
                            key={item.name}
                            onClick={() => {
                              setActiveNavItem(item.name);
                              setShowMoreMenu(false);
                              // optionally navigate: window.location.href = item.href;
                            }}
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive
                                ? "bg-[#0D9AAC]/10 text-[#043345]"
                                : "text-gray-700 hover:bg-gray-50 hover:text-[#0D9AAC]"
                            }`}
                          >
                            <Icon className="w-4 h-4 mr-3" />
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notifications (mobile) */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                      {unreadNotifications > 0 && (
                        <span className="text-xs bg-[#0D9AAC]/10 text-[#043345] px-2 py-1 rounded-full font-medium">
                          {unreadNotifications}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 max-h-36 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-2 py-2 text-sm rounded-md ${
                            n.unread ? "bg-[#0D9AAC]/5" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-800">{n.message}</p>
                          <p className="text-xs text-gray-500">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Messages (mobile) */}
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Messages</h3>
                      {unreadMessages > 0 && (
                        <span className="text-xs bg-[#0D9AAC]/10 text-[#043345] px-2 py-1 rounded-full font-medium">
                          {unreadMessages}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 max-h-36 overflow-y-auto">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`px-2 py-2 text-sm rounded-md ${
                            m.unread ? "bg-[#0D9AAC]/5" : ""
                          }`}
                        >
                          <p className="font-medium text-gray-900">
                            {m.sender}
                          </p>
                          <p className="text-sm text-gray-700">{m.message}</p>
                          <p className="text-xs text-gray-500">{m.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu (avatar) */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#00B6C7] to-[#009966] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                {/* removed dropdown chevron per request */}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">Mathematics Tutor</p>
                  </div>
                  {profileMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index}>
                        {item.divider && (
                          <div className="border-t border-gray-100 my-2" />
                        )}
                        <button
                          onClick={() => {
                            if (item.name === "My Profile") {
                              navigate("profile");
                            } else if (item.name === "Settings") {
                              navigate("settings");
                            } else if (item.name === "Earnings") {
                              navigate("earnings");
                            } else if (item.name === "Help & Support") {
                              navigate("help");
                            } else if (item.name === "Logout") {
                              // add logout logic here
                              navigate("/v1/login"); // Example redirect after logout
                            }
                          }}
                          className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                            item.name === "Logout"
                              ? "text-red-600 hover:bg-red-50"
                              : "text-gray-700 hover:bg-gray-50 hover:text-[#0D9AAC]"
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: we removed the horizontal scroll nav and replaced with a More button */}
      {/* (If you want a persistent bottom bar for mobile navigation we can add that separately) */}
    </nav>
  );
};

export default TutorTopNav;
