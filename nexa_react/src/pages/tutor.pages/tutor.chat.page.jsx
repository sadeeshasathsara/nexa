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

const TutorChat = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [courses, setCourses] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const pollIntervalRef = useRef(null);

  // Mock data for tutor's courses - Using your actual course data
  const mockCourses = [
    {
      id: "68fc9a59b4bce89b50a83e1e",
      name: "Digital Marketing Course",
      category: "Programming",
      thumbnailUrl: "",
      enrolledStudentsCount: 24,
      unreadCount: 3,
    },
    {
      id: "68fc9a9ab4bce89b50a83e3b",
      name: "UI/UX Design Course",
      category: "Design",
      thumbnailUrl: "",
      enrolledStudentsCount: 18,
      unreadCount: 1,
    },
    {
      id: "68fc9ae3b4bce89b50a83e3d",
      name: "English for Professionals",
      category: "Language",
      thumbnailUrl: "",
      enrolledStudentsCount: 32,
      unreadCount: 0,
    },
  ];

  // Mock chats data for each course with Sri Lankan student names
  const mockChatsData = {
    "68fc9a59b4bce89b50a83e1e": [
      // Digital Marketing Course
      {
        id: "s1",
        name: "Sanduni Perera",
        avatar: "SP",
        role: "student",
        lastMessage: "Thank you sir! I understand SEO strategies now",
        time: new Date(Date.now() - 10 * 60000),
        unreadCount: 2,
        online: true,
      },
      {
        id: "s2",
        name: "Kasun Wickramasinghe",
        avatar: "KW",
        role: "student",
        lastMessage: "Can we discuss social media marketing?",
        time: new Date(Date.now() - 2 * 3600000),
        unreadCount: 1,
        online: false,
      },
    ],
    "68fc9a9ab4bce89b50a83e3b": [
      // UI/UX Design Course
      {
        id: "s3",
        name: "Nethmi Fernando",
        avatar: "NF",
        role: "student",
        lastMessage: "Sir, I submitted the campaign analysis",
        time: new Date(Date.now() - 5 * 3600000),
        unreadCount: 0,
        online: true,
      },
      {
        id: "s4",
        name: "Tharindu Silva",
        avatar: "TS",
        role: "student",
        lastMessage: "The design prototype is ready sir",
        time: new Date(Date.now() - 30 * 60000),
        unreadCount: 1,
        online: true,
      },
      {
        id: "s5",
        name: "Chamodi Rajapaksha",
        avatar: "CR",
        role: "student",
        lastMessage: "Thank you for the design feedback!",
        time: new Date(Date.now() - 3 * 3600000),
        unreadCount: 0,
        online: true,
      },
      {
        id: "s6",
        name: "Ruwan Dissanayake",
        avatar: "RD",
        role: "student",
        lastMessage: "Sir, about the color theory assignment...",
        time: new Date(Date.now() - 12 * 3600000),
        unreadCount: 0,
        online: false,
      },
    ],
    "68fc9ae3b4bce89b50a83e3d": [
      // English for Professionals
      {
        id: "s7",
        name: "Kavinda Rodrigo",
        avatar: "KR",
        role: "student",
        lastMessage: "The presentation went perfectly!",
        time: new Date(Date.now() - 20 * 60000),
        unreadCount: 0,
        online: true,
      },
    ],
  };

  // Mock messages data
  const mockMessagesData = {
    s1: [
      {
        id: "m1",
        sender: "student",
        text: "Good evening sir! I have a question about SEO optimization from today's class",
        time: new Date(Date.now() - 25 * 60000),
        isRead: true,
      },
      {
        id: "m2",
        sender: "tutor",
        text: "Good evening Sanduni! Of course, which aspect are you referring to?",
        time: new Date(Date.now() - 23 * 60000),
        isRead: true,
      },
      {
        id: "m3",
        sender: "student",
        text: "The part about keyword research. I'm confused about long-tail vs short-tail keywords",
        time: new Date(Date.now() - 20 * 60000),
        isRead: true,
      },
      {
        id: "m4",
        sender: "tutor",
        text: "Great question! Long-tail keywords are more specific phrases (3+ words) with lower competition, while short-tail are broader (1-2 words) with high competition",
        time: new Date(Date.now() - 18 * 60000),
        isRead: true,
      },
      {
        id: "m5",
        sender: "student",
        text: "Oh! That makes sense. So for 'digital marketing course' would be long-tail?",
        time: new Date(Date.now() - 15 * 60000),
        isRead: true,
      },
      {
        id: "m6",
        sender: "tutor",
        text: "Exactly! It's specific and has lower competition than just 'marketing'",
        time: new Date(Date.now() - 12 * 60000),
        isRead: true,
      },
      {
        id: "m7",
        sender: "student",
        text: "Thank you sir! I understand SEO strategies now",
        time: new Date(Date.now() - 10 * 60000),
        isRead: false,
      },
    ],
    s4: [
      {
        id: "m8",
        sender: "student",
        text: "Sir, I've completed the wireframe for the mobile app",
        time: new Date(Date.now() - 2 * 3600000),
        isRead: true,
      },
      {
        id: "m9",
        sender: "tutor",
        text: "Great! Have you followed the design principles we discussed?",
        time: new Date(Date.now() - 1.5 * 3600000),
        isRead: true,
      },
      {
        id: "m10",
        sender: "student",
        text: "Yes sir, used proper contrast and alignment throughout",
        time: new Date(Date.now() - 1 * 3600000),
        isRead: true,
      },
      {
        id: "m11",
        sender: "tutor",
        text: "Perfect! Don't forget to test the user flow with the prototype",
        time: new Date(Date.now() - 45 * 60000),
        isRead: true,
      },
      {
        id: "m12",
        sender: "student",
        text: "The design prototype is ready sir",
        time: new Date(Date.now() - 30 * 60000),
        isRead: false,
      },
    ],
    s7: [
      {
        id: "m13",
        sender: "tutor",
        text: "Kavinda, how was your business presentation?",
        time: new Date(Date.now() - 2 * 3600000),
        isRead: true,
      },
      {
        id: "m14",
        sender: "student",
        text: "Sir, it went very well! I used the techniques we practiced",
        time: new Date(Date.now() - 90 * 60000),
        isRead: true,
      },
      {
        id: "m15",
        sender: "tutor",
        text: "Excellent! Were you able to maintain eye contact as we discussed?",
        time: new Date(Date.now() - 75 * 60000),
        isRead: true,
      },
      {
        id: "m16",
        sender: "student",
        text: "Yes sir, and I used the professional vocabulary from our lessons",
        time: new Date(Date.now() - 60 * 60000),
        isRead: true,
      },
      {
        id: "m17",
        sender: "student",
        text: "The presentation went perfectly!",
        time: new Date(Date.now() - 20 * 60000),
        isRead: false,
      },
    ],
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load initial data
  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  // Fetch chats when course is selected
  useEffect(() => {
    if (selectedCourse) {
      setChats(mockChatsData[selectedCourse.id] || []);
    }
  }, [selectedCourse]);

  // Fetch messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessagesData[selectedChat.id] || []);
      scrollToBottom();
    }
  }, [selectedChat]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat || !selectedCourse) return;

    const newMessage = {
      id: "m" + Date.now(),
      sender: "tutor",
      text: message.trim(),
      time: new Date(),
      isRead: false,
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Update last message in chat list
    const updatedChats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? { ...chat, lastMessage: message.trim(), time: new Date() }
        : chat
    );
    setChats(updatedChats);
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

    // Mark messages as read
    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    );
    setChats(updatedChats);

    // Update course unread count
    const totalUnread = updatedChats.reduce((sum, c) => sum + c.unreadCount, 0);
    const updatedCourses = courses.map((course) =>
      course.id === selectedCourse.id
        ? { ...course, unreadCount: totalUnread }
        : course
    );
    setCourses(updatedCourses);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const mins = Math.floor((now - date) / 60000);
      return mins < 1 ? "Just now" : `${mins}m ago`;
    } else if (diffInHours < 24) {
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
      course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCourseColor = (index) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-orange-500",
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
          {filteredCourses.map((course, index) => (
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
                  <p className="text-sm text-gray-500">
                    {course.enrolledStudentsCount} students
                  </p>
                </div>
                {course.unreadCount > 0 && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {course.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Students Chat List */}
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
                  <p className="text-xs text-gray-500">
                    {chats.length} students
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
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
                        {chat.avatar}
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
                          {chat.lastMessage}
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
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">Select a course to view students</p>
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
                      {selectedChat.avatar}
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
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Send className="text-gray-400 mb-2" size={48} />
                  <p className="text-gray-600">No messages yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Start the conversation with {selectedChat.name}
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "tutor" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                          msg.sender === "tutor"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800"
                        } rounded-2xl px-4 py-2 shadow-sm`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                        <div
                          className={`flex items-center gap-1 justify-end mt-1 ${
                            msg.sender === "tutor"
                              ? "text-blue-200"
                              : "text-gray-500"
                          }`}
                        >
                          <span className="text-xs">
                            {formatTime(msg.time)}
                          </span>
                          {msg.sender === "tutor" &&
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
                Select a Student
              </h2>
              <p className="text-gray-500">
                Choose a student chat to begin messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorChat;
