import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  BookOpen,
  Video,
  Star,
  Clock,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
  Globe,
  Award,
  Search,
  Home,
  Play,
  Trophy,
  Calendar,
  Archive,
} from "lucide-react";
import SearchBar from "./searchbar.component";
import LanguageToggle from "./languageTouggle.component";
import NavLink from "./navLink.component";
import Notification from "./notification.component";
import ProfileIcon from "./profileIcon.component";
import Logo from "../../../../assets/global.assets/logo3.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [notificationCount, setNotificationCount] = useState(3);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Define your navigation items
  const navigationItems = [
    { name: "Dashboard", icon: Home, path: "dashboard", badge: null },
    { name: "Courses", icon: BookOpen, path: "/analytics", badge: null },
    { name: "My Chat", icon: Play, path: "chat", badge: null },
    { name: "Resources", icon: Archive, path: "/resources", badge: null },
  ];

  // 🧩 Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsProfileDropdownOpen(false);
        setIsLanguageDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 🧩 Close mobile menu with ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ Navigate + update active state
  const handleNavItemClick = (item) => {
    setActiveItem(item.name);
    setIsMenuOpen(false);
    navigate(item.path);
  };

  // ✅ Navigate when clicking logo
  const handleLogoClick = () => {
    setActiveItem("Dashboard");
    navigate("/");
  };

  return (
    <>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className="shadow-lg border-b sticky border-gray-100 top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="h-15 w-[150px] flex items-center">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isActive={activeItem === item.name}
                  onClick={() => handleNavItemClick(item)}
                />
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search Button */}
              <button className="lg:hidden p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer">
                <Search className="h-5 w-5" />
              </button>

              {/* Language Toggle */}
              <LanguageToggle
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
                isLanguageDropdownOpen={isLanguageDropdownOpen}
                setIsLanguageDropdownOpen={setIsLanguageDropdownOpen}
              />

              {/* Notifications */}
              <Notification
                notificationCount={notificationCount}
                isNotificationOpen={isNotificationOpen}
                setIsNotificationOpen={setIsNotificationOpen}
              />

              {/* Profile Icon */}
              <ProfileIcon
                isProfileDropdownOpen={isProfileDropdownOpen}
                setIsProfileDropdownOpen={setIsProfileDropdownOpen}
              />

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer"
                  aria-label="Toggle mobile menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 md:hidden`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    EduPlatform
                  </h1>
                  <p className="text-xs text-gray-500">Learn. Grow. Excel.</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Search */}
            <SearchBar isMobile={true} />

            {/* Mobile Nav Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.name}
                    item={item}
                    isActive={activeItem === item.name}
                    onClick={() => handleNavItemClick(item)}
                    isMobile={true}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50">
              <LanguageToggle
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
                isLanguageDropdownOpen={isLanguageDropdownOpen}
                setIsLanguageDropdownOpen={setIsLanguageDropdownOpen}
                isMobile={true}
              />

              <div className="flex items-center space-x-3 p-3 mx-4 mb-4 bg-white rounded-xl border border-gray-200">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Premium Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
