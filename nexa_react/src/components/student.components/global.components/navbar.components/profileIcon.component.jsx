import React, { useState, useEffect } from 'react';
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
    Archive
} from 'lucide-react';


// ProfileIcon Component
const ProfileIcon = ({ isProfileDropdownOpen, setIsProfileDropdownOpen }) => {
    const profileMenuItems = [
        { name: 'My Profile', icon: User, path: '/profile' },
        { name: 'Settings', icon: Settings, path: '/settings' },
        { name: 'Achievements', icon: Award, path: '/achievements' }
    ];

    return (
        <div className="relative dropdown-container">
            <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 hover:bg-blue-50 rounded-xl transition-all duration-200 group cursor-pointer"
            >
                <div className="relative">
                    <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                        <span className="text-white text-sm font-bold">JD</span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">JD</span>
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500">Premium Student</p>
                                <div className="flex items-center mt-1">
                                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                    <span className="text-xs text-gray-600">Level 5 Learner</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600">Monthly Progress</span>
                            <span className="text-xs font-bold text-blue-600">73%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '73%' }}></div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {profileMenuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.name}
                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center group cursor-pointer"
                                >
                                    <IconComponent className="h-4 w-4 mr-3 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100">
                        <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center cursor-pointer">
                            <LogOut className="h-4 w-4 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;