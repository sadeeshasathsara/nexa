import React, { useState, useEffect } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageCircle,
    Users,
    Building2,
    HandHeart,
    GraduationCap,
    ArrowRight,
    CheckCircle,
    Globe,
    Headphones
} from 'lucide-react';
import Navbar from '../../components/global.components/navbar.component';
import Footer from '../../components/global.components/footer.component';

const ContactUs = () => {
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userType: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Us",
            primary: "hello@nexa.education",
            secondary: "support@nexa.education",
            description: "Get response within 24 hours",
            gradient: "from-[#043345] to-[#0D9AAC]"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us",
            primary: "+1 (555) 123-NEXA",
            secondary: "+1 (555) 456-7890",
            description: "Mon-Fri, 9AM-6PM EST",
            gradient: "from-[#0D9AAC] to-[#00B6C7]"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Live Chat",
            primary: "Available 24/7",
            secondary: "Instant support",
            description: "Click the chat bubble below",
            gradient: "from-[#00B6C7] to-[#009966]"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Us",
            primary: "123 Education Ave",
            secondary: "Learning City, LC 12345",
            description: "Open for meetings by appointment",
            gradient: "from-[#009966] to-[#00FF99]"
        }
    ];

    const userTypes = [
        { value: "student", label: "Student", icon: <GraduationCap className="w-5 h-5" /> },
        { value: "tutor", label: "Tutor", icon: <Users className="w-5 h-5" /> },
        { value: "institution", label: "Institution", icon: <Building2 className="w-5 h-5" /> },
        { value: "donor", label: "Donor", icon: <HandHeart className="w-5 h-5" /> },
        { value: "other", label: "Other", icon: <Globe className="w-5 h-5" /> }
    ];

    const supportCategories = [
        {
            icon: <Headphones className="w-8 h-8" />,
            title: "Technical Support",
            description: "Platform issues, login problems, technical difficulties",
            responseTime: "Within 2 hours"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "General Inquiries",
            description: "Questions about our services, features, and how NEXA works",
            responseTime: "Within 24 hours"
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            title: "Partnership",
            description: "Institutional partnerships, collaborations, business inquiries",
            responseTime: "Within 48 hours"
        },
        {
            icon: <HandHeart className="w-8 h-8" />,
            title: "Donations & Funding",
            description: "Information about supporting students and educational initiatives",
            responseTime: "Within 24 hours"
        }
    ];

    const faqs = [
        {
            question: "How do I get started with NEXA?",
            answer: "Simply create an account, choose your role (student, tutor, institution, or donor), and complete your profile to start connecting with our community."
        },
        {
            question: "Is NEXA free to use?",
            answer: "Yes! NEXA is free for students and basic features. We offer premium features for enhanced learning experiences and institutional tools."
        },
        {
            question: "How do I become a tutor?",
            answer: "Apply through our tutor portal, complete the verification process, and start sharing your knowledge with students worldwide."
        },
        {
            question: "What support do you offer?",
            answer: "We provide 24/7 technical support, educational resources, and dedicated assistance for all user types through multiple channels."
        }
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">

                {/* Hero Section */}
                <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#043345]/5 via-[#00B6C7]/10 to-[#00FF99]/5"></div>
                    <div className="relative max-w-7xl mx-auto">
                        <div className="text-center max-w-4xl mx-auto">
                            <div
                                id="hero"
                                data-animate
                                className={`transition-all duration-1000 ${visibleSections.has('hero')
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                                    Get in <span className="bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00FF99] bg-clip-text text-transparent">Touch</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                                    We're here to help you succeed. Whether you have questions, need support, or want to join our mission, we'd love to hear from you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div
                            id="contact-methods"
                            data-animate
                            className={`text-center mb-12 transition-all duration-1000 ${visibleSections.has('contact-methods')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose the method that works best for you</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contactMethods.map((method, index) => (
                                <div
                                    key={method.title}
                                    id={`method-${index}`}
                                    data-animate
                                    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 select-none group ${visibleSections.has(`method-${index}`)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className={`bg-gradient-to-r ${method.gradient} p-3 rounded-lg inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {React.cloneElement(method.icon, { className: "w-6 h-6 text-white" })}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                                    <p className="text-gray-900 font-medium mb-1">{method.primary}</p>
                                    <p className="text-gray-600 text-sm mb-2">{method.secondary}</p>
                                    <p className="text-gray-500 text-xs">{method.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content - Form and Support */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div
                                id="contact-form"
                                data-animate
                                className={`transition-all duration-1000 ${visibleSections.has('contact-form')
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-8'
                                    }`}
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                                    <div className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent transition-all duration-200"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent transition-all duration-200"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                                                I am a *
                                            </label>
                                            <select
                                                id="userType"
                                                name="userType"
                                                required
                                                value={formData.userType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select your role</option>
                                                {userTypes.map(type => (
                                                    <option key={type.value} value={type.value}>{type.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent transition-all duration-200"
                                                placeholder="Brief description of your inquiry"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D9AAC] focus:border-transparent transition-all duration-200 resize-none"
                                                placeholder="Tell us more about your question or how we can help you..."
                                            />
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            className="w-full bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
                                        >
                                            Send Message
                                            <Send className="ml-2 w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Support Categories */}
                            <div
                                id="support-categories"
                                data-animate
                                className={`transition-all duration-1000 delay-200 ${visibleSections.has('support-categories')
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-8'
                                    }`}
                            >
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Support Categories</h2>

                                <div className="space-y-6">
                                    {supportCategories.map((category, index) => (
                                        <div
                                            key={category.title}
                                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 select-none group"
                                        >
                                            <div className="flex items-start">
                                                <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                                                    {React.cloneElement(category.icon, { className: "w-6 h-6 text-white" })}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                                                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 text-[#009966] mr-2" />
                                                        <span className="text-xs text-gray-500">Response time: {category.responseTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <div
                            id="faq-header"
                            data-animate
                            className={`text-center mb-12 transition-all duration-1000 ${visibleSections.has('faq-header')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-lg text-gray-600">Quick answers to common questions</p>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    id={`faq-${index}`}
                                    data-animate
                                    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 select-none transition-all duration-1000 ${visibleSections.has(`faq-${index}`)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 text-[#009966] mr-3 flex-shrink-0" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed ml-8">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00B6C7]">
                    <div className="max-w-4xl mx-auto text-center">
                        <div
                            id="cta"
                            data-animate
                            className={`transition-all duration-1000 ${visibleSections.has('cta')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Still Have Questions?</h2>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                Our support team is standing by to help you get the most out of NEXA.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-[#043345] px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer">
                                    Start Live Chat
                                    <MessageCircle className="ml-2 w-5 h-5" />
                                </button>
                                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#043345] transition-all duration-300 cursor-pointer">
                                    Browse Help Center
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;