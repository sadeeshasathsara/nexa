import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Search,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
  BookOpen,
  CheckCheck,
  Check,
  AlertCircle,
  Loader,
} from "lucide-react";
import { chatAPI } from "../../apis/student.apis/chat.api"; // Import the chat API

const TutorChat = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [courses, setCourses] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const pollIntervalRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch chats when course is selected
  useEffect(() => {
    if (selectedCourse) {
      fetchChats(selectedCourse.id);
    }
  }, [selectedCourse]);

  // Fetch messages when chat is selected
  useEffect(() => {
    if (selectedChat && selectedCourse) {
      fetchMessages(selectedCourse.id, selectedChat.id);

      // Poll for new messages every 3 seconds
      pollIntervalRef.current = setInterval(() => {
        fetchMessages(selectedCourse.id, selectedChat.id, true);
      }, 3000);

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      };
    }
  }, [selectedChat, selectedCourse]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      setError(null);
      const response = await chatAPI.getStudentCourses();

      if (response.success) {
        setCourses(response.courses);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchChats = async (courseId) => {
    try {
      setLoadingChats(true);
      setError(null);
      const response = await chatAPI.getCourseChats(courseId);

      if (response.success) {
        setChats(response.chats);
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Failed to load chats. Please try again.");
    } finally {
      setLoadingChats(false);
    }
  };

  const fetchMessages = async (courseId, otherUserId, silent = false) => {
    try {
      if (!silent) setLoadingMessages(true);
      setError(null);

      const response = await chatAPI.getMessages(courseId, otherUserId);

      if (response.success) {
        setMessages(response.messages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      if (!silent) setError("Failed to load messages. Please try again.");
    } finally {
      if (!silent) setLoadingMessages(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat || !selectedCourse) return;

    try {
      setSendingMessage(true);

      const messageData = {
        courseId: selectedCourse.id,
        receiverId: selectedChat.id,
        text: message.trim(),
      };

      const response = await chatAPI.sendMessage(messageData);

      if (response.success) {
        setMessages([...messages, response.message]);
        setMessage("");

        // Update chat list to show new last message
        fetchChats(selectedCourse.id);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedChat(null);
    setMessages([]);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else if (diffInHours < 168) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tutor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCourseColor = (index) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Courses Sidebar */}
      <div
        className={`${
          selectedCourse ? "hidden md:flex" : "flex"
        } w-full md:w-80 bg-white border-r border-gray-200 flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-blue-600" size={24} />
            <h1 className="text-xl font-bold text-gray-800">My Courses</h1>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingCourses ? (
            <div className="flex items-center justify-center h-32">
              <Loader className="animate-spin text-blue-600" size={24} />
            </div>
          ) : error && courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <AlertCircle className="text-red-500 mb-2" size={40} />
              <p className="text-gray-600">{error}</p>
              <button
                onClick={fetchCourses}
                className="mt-4 text-blue-600 hover:underline"
              >
                Retry
              </button>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <BookOpen className="text-gray-400 mb-2" size={40} />
              <p className="text-gray-600">No courses found</p>
            </div>
          ) : (
            filteredCourses.map((course, index) => (
              <div
                key={course.id}
                onClick={() => handleCourseSelect(course)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedCourse?.id === course.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${getCourseColor(
                      index
                    )} w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold`}
                  >
                    {course.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {course.tutor}
                    </p>
                  </div>
                  {course.unreadCount > 0 && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {course.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chats List */}
      <div
        className={`${
          selectedCourse && !selectedChat ? "flex" : "hidden md:flex"
        } ${
          selectedChat ? "hidden lg:flex" : ""
        } w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex-col`}
      >
        {selectedCourse ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="md:hidden"
                >
                  <ArrowLeft size={20} />
                </button>
                <div
                  className={`${getCourseColor(
                    courses.findIndex((c) => c.id === selectedCourse.id)
                  )} w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm`}
                >
                  {selectedCourse.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-800 truncate">
                    {selectedCourse.name}
                  </h2>
                  <p className="text-xs text-gray-500 truncate">
                    {selectedCourse.tutor}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingChats ? (
                <div className="flex items-center justify-center h-32">
                  <Loader className="animate-spin text-blue-600" size={24} />
                </div>
              ) : chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Send className="text-gray-400 mb-2" size={40} />
                  <p className="text-gray-600">No chats available</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedChat?.id === chat.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {typeof chat.avatar === "string" &&
                          chat.avatar.length <= 2
                            ? chat.avatar
                            : chat.name.charAt(0)}
                        </div>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {formatTime(chat.time)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600 truncate">
                            {chat.lastMessage || "No messages yet"}
                          </p>
                          {chat.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold ml-2 flex-shrink-0">
                              {chat.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">Select a course to view chats</p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden lg:flex"
        } flex-1 flex-col bg-gray-50`}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="lg:hidden"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {typeof selectedChat.avatar === "string" &&
                      selectedChat.avatar.length <= 2
                        ? selectedChat.avatar
                        : selectedChat.name.charAt(0)}
                    </div>
                    {selectedChat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {selectedChat.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedChat.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="animate-spin text-blue-600" size={32} />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Send className="text-gray-400 mb-2" size={48} />
                  <p className="text-gray-600">No messages yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Start the conversation!
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "student"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                          msg.sender === "student"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800"
                        } rounded-2xl px-4 py-2 shadow-sm`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                        <div
                          className={`flex items-center gap-1 justify-end mt-1 ${
                            msg.sender === "student"
                              ? "text-blue-200"
                              : "text-gray-500"
                          }`}
                        >
                          <span className="text-xs">
                            {formatTime(msg.time)}
                          </span>
                          {msg.sender === "student" &&
                            (msg.isRead ? (
                              <CheckCheck size={14} />
                            ) : (
                              <Check size={14} />
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-t border-red-200 p-3">
                <div className="flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto text-red-700 hover:text-red-900"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-end gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows="1"
                    disabled={sendingMessage}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || sendingMessage}
                  className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {sendingMessage ? (
                    <Loader className="animate-spin text-white" size={20} />
                  ) : (
                    <Send size={20} className="text-white" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="text-gray-400" size={40} />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Start a Conversation
              </h2>
              <p className="text-gray-500">
                Select a chat to begin messaging with your tutor
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorChat;
