import React, { useState, useEffect } from 'react';
import {
    Target,
    Eye,
    BookOpen,
    Users,
    Shield,
    Lightbulb,
    Heart,
    Zap,
    GraduationCap,
    UserCheck,
    Building2,
    HandHeart,
    TrendingUp,
    Globe,
    Award,
    ArrowRight,
    Play,
    Star,
    CheckCircle
} from 'lucide-react';
import Footer from '../../components/global.components/footer.component';
import Navbar from '../../components/global.components/navbar.component';

const AboutUs = () => {
    const [visibleSections, setVisibleSections] = useState(new Set());

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

    const values = [
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Accessibility",
            description: "Breaking barriers to make quality education available to everyone, everywhere."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Collaboration",
            description: "Building bridges between students, educators, institutions, and supporters."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Transparency",
            description: "Providing clear visibility into learning progress and impact metrics."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Innovation",
            description: "Leveraging cutting-edge technology to enhance the learning experience."
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Community",
            description: "Fostering a supportive environment where everyone grows together."
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Excellence",
            description: "Maintaining the highest standards in education delivery and support."
        }
    ];

    const stakeholders = [
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Students",
            description: "Access personalized learning paths, live sessions, and comprehensive course materials.",
            features: ["Interactive Courses", "Live Classes", "Progress Tracking"],
            action: "Start Learning",
            gradient: "from-[#043345] to-[#0D9AAC]"
        },
        {
            icon: <UserCheck className="w-8 h-8" />,
            title: "Tutors",
            description: "Share expertise with flexible scheduling and comprehensive teaching tools.",
            features: ["Flexible Hours", "Teaching Resources", "Impact Analytics"],
            action: "Become a Tutor",
            gradient: "from-[#0D9AAC] to-[#00B6C7]"
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            title: "Institutions",
            description: "Streamline education management with powerful administrative tools.",
            features: ["Student Management", "Performance Analytics", "Resource Planning"],
            action: "Partner with Us",
            gradient: "from-[#00B6C7] to-[#009966]"
        },
        {
            icon: <HandHeart className="w-8 h-8" />,
            title: "Donors",
            description: "Create lasting impact with transparent funding and detailed progress reports.",
            features: ["Impact Reports", "Transparent Funding", "Direct Connection"],
            action: "Make Impact",
            gradient: "from-[#009966] to-[#00FF99]"
        }
    ];

    const stats = [
        { number: "50K+", label: "Active Students", icon: <Users className="w-5 h-5" /> },
        { number: "180+", label: "Countries", icon: <Globe className="w-5 h-5" /> },
        { number: "2.5K+", label: "Expert Tutors", icon: <Star className="w-5 h-5" /> },
        { number: "98%", label: "Success Rate", icon: <Award className="w-5 h-5" /> }
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">


                {/* Hero Section */}
                <section className="relative py-12 sm:py-20 lg:py-28 px-4 overflow-hidden">
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
                                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                                    Meet <span className="bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00FF99] bg-clip-text text-transparent">NEXA</span>
                                </h1>
                                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                                    Transforming education through technology, community, and measurable impact
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <button className="group bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center cursor-pointer">
                                        Get Started Free
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button className="group flex items-center text-gray-700 hover:text-[#0D9AAC] transition-colors cursor-pointer">
                                        <div className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center mr-3 group-hover:shadow-xl transition-shadow">
                                            <Play className="w-5 h-5 ml-1" />
                                        </div>
                                        Watch Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div
                            id="stats"
                            data-animate
                            className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${visibleSections.has('stats')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            {stats.map((stat, index) => (
                                <div key={stat.label} className="text-center group select-none">
                                    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                                        <div className="text-[#0D9AAC] mb-2 flex justify-center">
                                            {stat.icon}
                                        </div>
                                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                        <div className="text-xs text-gray-600">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16 lg:py-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                            <div
                                id="mission"
                                data-animate
                                className={`transition-all h-full duration-1000 delay-200 ${visibleSections.has('mission')
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-8'
                                    }`}
                            >
                                <div className="relative select-none h-full">
                                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-r from-[#043345] to-[#0D9AAC] rounded-xl opacity-10 transform rotate-12"></div>
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative h-full flex flex-col">
                                        <div className="flex items-center mb-6">
                                            <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] p-3 rounded-xl mr-4">
                                                <Target className="w-6 h-6 text-white" />
                                            </div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Mission</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed flex-grow">
                                            To democratize quality education by creating an inclusive platform that connects students with expert tutors,
                                            supportive institutions, and generous donors—making learning accessible regardless of geography, background, or resources.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="vision"
                                data-animate
                                className={`transition-all md:h-full duration-1000 delay-300 ${visibleSections.has('vision')
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-8'
                                    }`}
                            >
                                <div className="relative md:h-full select-none">
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-[#00B6C7] to-[#009966] rounded-xl opacity-10 transform -rotate-12"></div>
                                    <div className="bg-white md:h-full rounded-2xl p-6 shadow-sm border border-gray-100 relative">
                                        <div className="flex items-center mb-6">
                                            <div className="bg-gradient-to-r from-[#00B6C7] to-[#009966] p-3 rounded-xl mr-4">
                                                <Eye className="w-6 h-6 text-white" />
                                            </div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Vision</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            To build a world where every individual has access to personalized, high-quality education that empowers them
                                            to reach their full potential and contribute meaningfully to their communities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-16 lg:py-24 px-4 bg-gradient-to-r from-gray-50 to-[#00FF99]/5">
                    <div className="max-w-4xl mx-auto text-center">
                        <div
                            id="story"
                            data-animate
                            className={`transition-all duration-1000 ${visibleSections.has('story')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#00B6C7] to-[#009966] rounded-3xl mb-6">
                                    <BookOpen className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left select-none">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    NEXA emerged from a simple yet powerful realization: education should never be limited by circumstance.
                                    Founded by educators and technologists who witnessed talented students struggling without access to quality resources and guidance.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Today, we're proud to bridge the gap between aspiration and achievement, creating a global community where
                                    learning thrives through connection, innovation, and shared purpose.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-16 lg:py-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div
                            id="values-header"
                            data-animate
                            className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('values-header')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The principles that guide every decision we make</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {values.map((value, index) => (
                                <div
                                    key={value.title}
                                    id={`value-${index}`}
                                    data-animate
                                    className={`group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#0D9AAC]/20 transition-all duration-500 select-none ${visibleSections.has(`value-${index}`)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] p-2 rounded-lg inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {React.cloneElement(value.icon, { className: "w-5 h-5 text-white" })}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What We Do */}
                <section className="py-16 lg:py-24 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div
                            id="what-we-do"
                            data-animate
                            className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('what-we-do')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Who We Serve</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Empowering every member of the education community</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {stakeholders.map((stakeholder, index) => (
                                <div
                                    key={stakeholder.title}
                                    id={`stakeholder-${index}`}
                                    data-animate
                                    className={`group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 select-none ${visibleSections.has(`stakeholder-${index}`)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`bg-gradient-to-r ${stakeholder.gradient} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                            {React.cloneElement(stakeholder.icon, { className: "w-6 h-6 text-white" })}
                                        </div>
                                        <button className={`bg-gradient-to-r ${stakeholder.gradient} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center cursor-pointer`}>
                                            {stakeholder.action}
                                            <ArrowRight className="ml-2 w-3 h-3" />
                                        </button>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{stakeholder.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{stakeholder.description}</p>

                                    <div className="space-y-2">
                                        {stakeholder.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-gray-600">
                                                <CheckCircle className="w-3 h-3 text-[#009966] mr-2 flex-shrink-0" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 lg:py-24 px-4 bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00B6C7]">
                    <div className="max-w-4xl mx-auto text-center">
                        <div
                            id="cta"
                            data-animate
                            className={`transition-all duration-1000 ${visibleSections.has('cta')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to Transform Education?</h2>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                Join thousands of learners, educators, and supporters who are already making a difference.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-[#043345] px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer">
                                    Get Started Today
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#043345] transition-all duration-300 cursor-pointer">
                                    Schedule Demo
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

export default AboutUs;