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

// LanguageToggle Component
const LanguageToggle = ({
    currentLanguage,
    setCurrentLanguage,
    isLanguageDropdownOpen,
    setIsLanguageDropdownOpen,
    isMobile = false
}) => {
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
        { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
    ];

    const handleLanguageChange = (language) => {
        setCurrentLanguage(language.name);
        setIsLanguageDropdownOpen(false);
    };

    if (isMobile) {
        return (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Language</span>
                    <select
                        value={currentLanguage}
                        onChange={(e) => setCurrentLanguage(e.target.value)}
                        className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.name}>{lang.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    return (
        <div className="relative dropdown-container hidden sm:block">
            <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer"
            >
                <Globe className="h-5 w-5" />
                <ChevronDown className={`h-3 w-3 ml-1 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select Language</p>
                    </div>
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language)}
                            className={`
                                w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center hover:bg-blue-50 cursor-pointer
                                ${currentLanguage === language.name
                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                    : 'text-gray-700'
                                }
                            `}
                        >
                            <span className="mr-3 text-lg">{language.flag}</span>
                            {language.name}
                            {currentLanguage === language.name && (
                                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageToggle;