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

// SearchBar Component
const SearchBar = ({ searchQuery, setSearchQuery, isMobile = false }) => {
    if (isMobile) {
        return (
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, sessions, resources..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm placeholder-gray-500"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200 cursor-pointer"
                    >
                        <X className="h-4 w-4 text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;