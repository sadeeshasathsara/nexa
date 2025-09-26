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


// NavLink Component
const NavLink = ({ item, isActive, onClick, isMobile = false }) => {
    const IconComponent = item.icon;

    if (isMobile) {
        return (
            <div className="relative">
                <button
                    onClick={() => onClick(item.name)}
                    className={`
                        w-full flex items-center px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                        ${isActive
                            ? 'text-blue-600 bg-blue-50 shadow-sm'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }
                    `}
                >
                    <IconComponent
                        className={`h-5 w-5 mr-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                    />
                    {item.name}
                </button>

                {item.badge && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                        {item.badge}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => onClick(item.name)}
                className={`
                    relative flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group cursor-pointer
                    ${isActive
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                    }
                `}
            >
                <IconComponent
                    className={`h-5 w-5 mr-2 transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                        }`}
                />
                {item.name}
            </button>

            {item.badge && (
                <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-sm animate-pulse">
                    {item.badge}
                </span>
            )}
        </div>
    );
};

export default NavLink;