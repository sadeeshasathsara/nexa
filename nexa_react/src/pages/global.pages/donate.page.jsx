import React, { useState, useEffect } from 'react';
import {
    Heart,
    Users,
    BookOpen,
    Globe,
    Target,
    TrendingUp,
    DollarSign,
    Gift,
    Star,
    Shield,
    CheckCircle,
    ArrowRight,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CreditCard,
    Calendar,
    Zap,
    Award,
    PieChart
} from 'lucide-react';
import Footer from '../../components/global.components/footer.component';
import Navbar from '../../components/global.components/navbar.component';

const NEXADonationPage = () => {
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [isRegistered, setIsRegistered] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [donationType, setDonationType] = useState('one-time');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registration data:', formData);
        setIsRegistered(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        setIsRegistered(true);
        setShowLogin(false);
    };

    const handleDonate = (e) => {
        e.preventDefault();
        // Handle donation logic here
        const amount = selectedAmount || customAmount;
        console.log('Donation:', { amount, type: donationType });
    };

    const impactStats = [
        {
            icon: <Users className="w-6 h-6" />,
            number: "10,000+",
            label: "Students Supported",
            description: "Active learners receiving free tutoring"
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            number: "500+",
            label: "Volunteer Tutors",
            description: "Dedicated educators sharing knowledge"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            number: "25+",
            label: "Countries Reached",
            description: "Global impact across communities"
        },
        {
            icon: <Award className="w-6 h-6" />,
            number: "95%",
            label: "Success Rate",
            description: "Students improving their academic performance"
        }
    ];

    const donationAmounts = [
        { amount: '25', impact: 'Provides study materials for 2 students' },
        { amount: '50', impact: 'Sponsors 5 tutoring sessions' },
        { amount: '100', impact: 'Supports a student for 1 month' },
        { amount: '250', impact: 'Funds platform development for better features' },
        { amount: '500', impact: 'Sponsors 10 students for complete courses' },
        { amount: '1000', impact: 'Creates scholarship program for underprivileged students' }
    ];

    const donationCategories = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Direct Student Support",
            description: "Fund free tutoring sessions, scholarships, and study materials for underprivileged students worldwide.",
            raised: 50,
            goal: "75,000",
            gradient: "from-[#043345] to-[#0D9AAC]"
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Platform Development",
            description: "Enhance video conferencing, progress tracking, and resource sharing capabilities for better learning.",
            raised: 30,
            goal: "50,000",
            gradient: "from-[#0D9AAC] to-[#00B6C7]"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Outreach & Community Growth",
            description: "Connect with more students and volunteer tutors globally to expand our educational impact.",
            raised: 20,
            goal: "25,000",
            gradient: "from-[#00B6C7] to-[#009966]"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Tutor Support Program",
            description: "Train and support volunteer tutors who dedicate their time to teaching and mentoring students.",
            raised: 65,
            goal: "40,000",
            gradient: "from-[#009966] to-[#00FF99]"
        }
    ];

    const trustIndicators = [
        { icon: <Shield className="w-5 h-5" />, text: "🔒 100% Secure Donations" },
        { icon: <PieChart className="w-5 h-5" />, text: "📈 Real-time Impact Dashboard" },
        { icon: <Mail className="w-5 h-5" />, text: "📬 Regular Updates & Reports" },
        { icon: <CheckCircle className="w-5 h-5" />, text: "💝 Donor Recognition Program" }
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
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#043345] to-[#00FF99] rounded-full mb-8">
                                    <Star className="w-10 h-10 text-white" />
                                </div>
                                <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                                    Support <span className="bg-gradient-to-r from-[#043345] via-[#0D9AAC] to-[#00FF99] bg-clip-text text-transparent">NEXA</span> – Next Level Learning
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                                    "Together, we can make quality education accessible to every student."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div
                            id="impact-stats"
                            data-animate
                            className={`text-center mb-8 transition-all duration-1000 ${visibleSections.has('impact-stats')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact So Far</h2>
                            <p className="text-gray-600">See how donations are making a real difference</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {impactStats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    id={`stat-${index}`}
                                    data-animate
                                    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center select-none group hover:shadow-lg transition-all duration-500 ${visibleSections.has(`stat-${index}`)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] p-3 rounded-lg inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {React.cloneElement(stat.icon, { className: "w-6 h-6 text-white" })}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">{stat.label}</div>
                                    <div className="text-xs text-gray-500">{stat.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Donate Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div
                            id="why-donate"
                            data-animate
                            className={`text-center mb-12 transition-all duration-1000 ${visibleSections.has('why-donate')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">💡 Why Donate?</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Millions of students around the world face barriers to quality education—whether it's lack of resources, guidance, or access to dedicated tutors. At <strong>NEXA</strong>, we bridge this gap by connecting students with volunteer tutors, institutions, and learning resources through a transparent and impact-driven platform.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-8 text-left">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Your support helps us:</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-[#009966] mt-1 mr-4 flex-shrink-0" />
                                        <span className="text-gray-700">Provide free tutoring and learning sessions for underprivileged students.</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-[#009966] mt-1 mr-4 flex-shrink-0" />
                                        <span className="text-gray-700">Offer study materials, past papers, and interactive exercises.</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-[#009966] mt-1 mr-4 flex-shrink-0" />
                                        <span className="text-gray-700">Maintain and scale our platform so more learners can benefit.</span>
                                    </div>
                                    <div className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-[#009966] mt-1 mr-4 flex-shrink-0" />
                                        <span className="text-gray-700">Train and support volunteer tutors who dedicate their time to teaching.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Where Your Donation Goes */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div
                            id="donation-breakdown"
                            data-animate
                            className={`text-center mb-12 transition-all duration-1000 ${visibleSections.has('donation-breakdown')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">📊 Where Your Donation Goes</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                We believe in <strong>transparency</strong> and ensure every contribution creates measurable impact.
                            </p>

                            <div className="grid lg:grid-cols-3 gap-8 text-left">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] p-4 rounded-xl inline-flex items-center justify-center mb-4">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#043345] mb-2">50%</h3>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🎓 Direct Student Support</h4>
                                    <p className="text-gray-600 text-sm">Tutoring sessions, scholarships, study materials</p>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="bg-gradient-to-r from-[#0D9AAC] to-[#00B6C7] p-4 rounded-xl inline-flex items-center justify-center mb-4">
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0D9AAC] mb-2">30%</h3>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">💻 Platform Development</h4>
                                    <p className="text-gray-600 text-sm">Video conferencing, progress tracking, resource sharing</p>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="bg-gradient-to-r from-[#00B6C7] to-[#009966] p-4 rounded-xl inline-flex items-center justify-center mb-4">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#00B6C7] mb-2">20%</h3>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🌍 Outreach & Community Growth</h4>
                                    <p className="text-gray-600 text-sm">Connecting with more students and tutors</p>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-700 font-medium">
                                    Every donor has access to an <strong className="text-[#043345]">impact dashboard</strong>, showing how your contribution changes lives.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Real Impact Stories */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div
                            id="impact-stories"
                            data-animate
                            className={`text-center mb-12 transition-all duration-1000 ${visibleSections.has('impact-stories')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">✨ Real Impact, Real Stories</h2>

                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-r from-[#043345]/5 to-[#0D9AAC]/5 rounded-2xl p-8 text-left">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-[#043345] to-[#0D9AAC] rounded-full flex items-center justify-center mr-4">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Ayesha</h4>
                                            <p className="text-sm text-gray-600">Grade 10 Student</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic leading-relaxed">
                                        "Thanks to NEXA, I finally had access to a math tutor who helped me pass my exams. I feel more confident and ready for the future."
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-[#00B6C7]/5 to-[#009966]/5 rounded-2xl p-8 text-left">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-[#00B6C7] to-[#009966] rounded-full flex items-center justify-center mr-4">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Ravi</h4>
                                            <p className="text-sm text-gray-600">Volunteer Tutor</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic leading-relaxed">
                                        "As a volunteer tutor, I see how much these students improve each week. Knowing donors make this possible motivates me to give my best."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ways to Give - Donation Categories */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div
                            id="categories-header"
                            data-animate
                            className={`text-center mb-12 transition-all duration-1000 ${visibleSections.has('categories-header')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">💝 Ways to Give</h2>
                            <p className="text-lg text-gray-600">Choose how you'd like to support NEXA's mission</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {donationCategories.map((category, index) => (
                                <div
                                    key={category.title}
                                    id={`category-${index}`}
                                    data-animate
                                    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 select-none group ${visibleSections.has(`category-${index}`)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`bg-gradient-to-r ${category.gradient} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                            {React.cloneElement(category.icon, { className: "w-6 h-6 text-white" })}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500 mb-1">Goal: ${category.goal}</div>
                                            <div className="text-lg font-bold text-gray-900">{category.raised}% funded</div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{category.description}</p>

                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                        <div
                                            className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000`}
                                            style={{ width: `${category.raised}%` }}
                                        ></div>
                                    </div>

                                    <button className={`bg-gradient-to-r ${category.gradient} text-white px-6 py-3 rounded-lg text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center cursor-pointer`}>
                                        Donate to This Cause
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Donor Registration CTA Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <div
                            id="donor-cta"
                            data-animate
                            className={`transition-all duration-1000 ${visibleSections.has('donor-cta')
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#043345] to-[#00FF99] rounded-full mb-6">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>

                                <h2 className="text-3xl font-bold text-gray-900 mb-4">👉 Ready to Make a Difference?</h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Join thousands of donors who are already changing lives through education.
                                    Register as a donor to track your impact, receive updates, and be part of our community.
                                </p>

                                <div className="space-y-6">
                                    {/* Big Donate Now Button */}
                                    <button className="w-full sm:w-auto bg-gradient-to-r from-[#009966] to-[#00FF99] text-white px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer mx-auto">
                                        <Gift className="mr-3 w-6 h-6" />
                                        Donate Now
                                        <ArrowRight className="ml-3 w-6 h-6" />
                                    </button>


                                </div>

                                {/* Trust Indicators */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {trustIndicators.map((indicator, index) => (
                                            <div key={index} className="flex items-center text-xs text-gray-600 select-none justify-center lg:justify-start">
                                                <div className="text-[#009966] mr-2">
                                                    {indicator.icon}
                                                </div>
                                                {indicator.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recognition & Community Info */}
                                <div className="mt-8">
                                    <div className="bg-gradient-to-r from-[#043345]/5 to-[#00FF99]/5 rounded-lg p-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">🙏 Recognition & Community</h4>
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                            We celebrate every donor's contribution. Choose to remain anonymous or join our Supporter Spotlight.
                                            Recurring donors receive badges and milestones on their dashboard as tokens of appreciation.
                                        </p>
                                        <div className="flex items-center justify-center text-xs text-gray-600">
                                            <Award className="w-4 h-4 text-[#009966] mr-2" />
                                            <span>Supporter badges • Impact tracking • Community recognition</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">🚀 Join the Movement</h2>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                Be part of a global community making education accessible for all. With your help, NEXA isn't just a platform—it's a movement toward a world where every student has the chance to learn, grow, and succeed.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-[#043345] px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer">
                                    📧 Contact Donor Support
                                    <Mail className="ml-2 w-5 h-5" />
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

export default NEXADonationPage;