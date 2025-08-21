import React, { useState, useEffect } from 'react';
import {
    Home,
    GraduationCap,
    UserCheck,
    Building,
    Heart,
    BookOpen,
    Menu,
    X,
    Globe,
    LogIn,
    UserPlus,
    ChevronDown,
    Contact
} from 'lucide-react';
import logo from '../../assets/global.assets/logo3.png';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('EN');
    const [activeLink, setActiveLink] = useState('Home');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const languages = [
        { code: 'EN', label: 'EN' },
        { code: 'SI', label: 'සි' },
        { code: 'TA', label: 'தமிழ்' }
    ];

    const navLinks = [
        { name: 'Home', href: '#home', icon: Home },
        { name: 'About', href: '#about', icon: BookOpen },
        { name: 'Contact', href: '#contact', icon: Contact },
        { name: 'Donate', href: '#donate', icon: Heart }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`bg-white shadow-lg border-b border-gray-200 transition-all duration-300 z-50 ${isScrolled
            ? 'fixed top-0 left-0 right-0'
            : 'relative'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-3 items-center h-16 w-full">

                    {/* Left - Logo/Branding */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="h-15 w-[200px] flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Center Section - Main Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center justify-center">
                        <div className="flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const IconComponent = link.icon;
                                const isActive = activeLink === link.name;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setActiveLink(link.name)}
                                        className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 ${isActive
                                            ? 'text-[#0d9aac] bg-[#00b6c713]'
                                            : 'text-gray-700 hover:text-[#0d9aac] hover:bg-[#00b6c713]'
                                            }`}
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        <span>{link.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Section - Language Toggle & Auth Buttons (Desktop) */}
                    <div className="hidden md:flex items-center justify-end space-x-3">
                        {/* Language Toggle */}
                        <div className="relative group">
                            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0d9aac] transition-colors duration-200 cursor-pointer rounded-md hover:bg-[#00b6c713]">
                                <Globe className="h-4 w-4" />
                                <span>{selectedLanguage}</span>
                                <ChevronDown className="h-3 w-3" />
                            </button>

                            <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg ring-1 ring-black/10 ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <div className="py-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setSelectedLanguage(lang.code)}
                                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors cursor-pointer ${selectedLanguage === lang.code ? 'text-[#0d9aac] bg-[#00b6c713]' : 'text-gray-700'
                                                }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Auth Buttons */}
                        <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-[#00b6c713] hover:text-[#0d9aac] hover:border-[#0d9aac] transition-colors duration-200 cursor-pointer">
                            <LogIn className="h-4 w-4" />
                            <span>Login</span>
                        </button>

                        <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-[#0d9aac] hover:bg-[#0b8a9a] rounded-md transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer">
                            <UserPlus className="h-4 w-4" />
                            <span>Sign Up</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button - positioned in right section on mobile */}
                    <div className="md:hidden flex justify-end">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#0d9aac] hover:bg-[#00b6c713] transition-colors duration-200 cursor-pointer"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => {
                            const IconComponent = link.icon;
                            const isActive = activeLink === link.name;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => {
                                        setActiveLink(link.name);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-200 ${isActive
                                        ? 'text-[#0d9aac] bg-[#00b6c713]'
                                        : 'text-gray-700 hover:text-[#0d9aac] hover:bg-[#00b6c713]'
                                        }`}
                                >
                                    <IconComponent className="h-5 w-5" />
                                    <span>{link.name}</span>
                                </a>
                            );
                        })}

                        {/* Mobile Language Toggle */}
                        <div className="px-3 py-2 border-t border-gray-100 mt-2">
                            <div className="flex items-center space-x-2 mb-3">
                                <Globe className="h-5 w-5 text-gray-600" />
                                <span className="text-base font-medium text-gray-700">Language</span>
                            </div>
                            <div className="flex space-x-2 ml-7">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setSelectedLanguage(lang.code)}
                                        className={`px-3 py-1 text-sm rounded transition-colors cursor-pointer ${selectedLanguage === lang.code
                                            ? 'bg-[#00b6c713] text-[#0d9aac]'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Auth Buttons */}
                        <div className="px-3 py-2 space-y-2 border-t border-gray-100">
                            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-[#00b6c713] hover:text-[#0d9aac] hover:border-[#0d9aac] transition-colors duration-200 cursor-pointer">
                                <LogIn className="h-4 w-4" />
                                <span>Login</span>
                            </button>

                            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-[#0d9aac] hover:bg-[#0b8a9a] rounded-md transition-all duration-200 shadow-md cursor-pointer">
                                <UserPlus className="h-4 w-4" />
                                <span>Sign Up</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}