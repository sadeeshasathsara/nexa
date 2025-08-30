import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    ExternalLink,
    Heart,
    Globe,
    BookOpen,
    Users,
    Award,
    ChevronRight,
    Send
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About', href: '#about' },
            { name: 'Contact', href: '#contact' },
            { name: 'FAQs', href: '#faqs' },
            { name: 'Our Team', href: '#team' },
            { name: 'Careers', href: '#careers' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#privacy' },
            { name: 'Terms of Service', href: '#terms' },
            { name: 'Cookie Policy', href: '#cookies' },
            { name: 'Data Protection', href: '#data-protection' },
            { name: 'Accessibility', href: '#accessibility' }
        ],
        resources: [
            { name: 'Learning Hub', href: '#learning-hub' },
            { name: 'Documentation', href: '#docs' },
            { name: 'API Reference', href: '#api' },
            { name: 'Community', href: '#community' },
            { name: 'Blog', href: '#blog' }
        ],
        support: [
            { name: 'Help Center', href: '#help' },
            { name: 'Contact Support', href: '#support' },
            { name: 'System Status', href: '#status' },
            { name: 'Report Issues', href: '#report' },
            { name: 'Feedback', href: '#feedback' }
        ]
    };

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#facebook', color: 'hover:text-blue-600' },
        { name: 'Twitter', icon: Twitter, href: '#twitter', color: 'hover:text-sky-500' },
        { name: 'Instagram', icon: Instagram, href: '#instagram', color: 'hover:text-pink-600' },
        { name: 'LinkedIn', icon: Linkedin, href: '#linkedin', color: 'hover:text-blue-700' },
        { name: 'YouTube', icon: Youtube, href: '#youtube', color: 'hover:text-red-600' }
    ];

    const contactInfo = [
        { icon: Mail, text: 'nexa.nexgen@gmail.com', href: 'mailto:nexa.nexgen@gmail.com' },
        { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { icon: MapPin, text: 'Colombo, Sri Lanka', href: '#location' }
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Company Info & SDG Badge */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <div className="mb-4">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0d9aac] via-purple-500 to-blue-600 bg-clip-text text-transparent mb-2">
                                    NEXA
                                </h2>
                                <p className="text-sm text-gray-400 font-medium">
                                    Next Level Learning
                                </p>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Empowering education through innovative technology solutions.
                                Committed to quality education and sustainable development.
                            </p>
                        </div>

                        {/* SDG 4 Badge */}
                        <div className="mb-6">
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg">
                                <Award className="h-5 w-5 text-white" />
                                <span className="text-sm font-semibold text-white">SDG 4: Quality Education</span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            {contactInfo.map((contact, index) => {
                                const IconComponent = contact.icon;
                                return (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                                    >
                                        <IconComponent className="h-4 w-4 text-gray-400 group-hover:text-white" />
                                        <span className="text-sm">{contact.text}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Stay Connected</h3>

                        {/* Newsletter Signup */}
                        <div className="mb-8">
                            <p className="text-gray-300 text-sm mb-4">
                                Subscribe to our newsletter for updates and insights.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-r-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Support Links */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold mb-3 text-gray-200">Support</h4>
                            <ul className="space-y-2">
                                {footerLinks.support.slice(0, 3).map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                        >
                                            <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media & Legal Section */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

                        {/* Social Media Links */}
                        <div className="flex items-center space-x-6">
                            <span className="text-gray-300 text-sm font-medium">Follow us:</span>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className={`text-gray-400 ${social.color} transition-colors duration-200 hover:scale-110 transform`}
                                            aria-label={social.name}
                                        >
                                            <IconComponent className="h-5 w-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
                            {footerLinks.legal.slice(0, 3).map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>© {currentYear} NEXA. All rights reserved.</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>for better education</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}