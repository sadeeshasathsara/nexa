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

// Notification Component
const Notification = ({ notificationCount, isNotificationOpen, setIsNotificationOpen }) => {
    const notifications = [
        {
            id: 1,
            title: 'New Course Available',
            message: 'Advanced React Patterns is now live',
            time: '2m ago',
            unread: true,
            type: 'course'
        },
        {
            id: 2,
            title: 'Assignment Due',
            message: 'JavaScript fundamentals due tomorrow',
            time: '1h ago',
            unread: true,
            type: 'deadline'
        },
        {
            id: 3,
            title: 'Achievement Unlocked',
            message: 'You completed 5 courses this month!',
            time: '3h ago',
            unread: false,
            type: 'achievement'
        }
    ];

    const handleNotificationClick = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'course': return <BookOpen className="h-4 w-4 text-blue-500" />;
            case 'deadline': return <Clock className="h-4 w-4 text-orange-500" />;
            case 'achievement': return <Trophy className="h-4 w-4 text-yellow-500" />;
            default: return <Bell className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="relative dropdown-container">
            <button
                onClick={handleNotificationClick}
                className="relative p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer"
            >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                        {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                )}
            </button>

            {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-900">Notifications</p>
                            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                                Mark all read
                            </button>
                        </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`px-4 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${notification.unread ? 'bg-blue-50/30' : ''
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {notification.title}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {notification.time}
                                        </p>
                                    </div>
                                    {notification.unread && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100">
                        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;