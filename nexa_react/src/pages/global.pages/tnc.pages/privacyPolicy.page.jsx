import React from 'react';
import { Shield, Eye, Database, Users, Cookie, Lock, FileText, CreditCard, Mail, MapPin, UserCheck } from 'lucide-react';
import Footer from '../../../components/global.components/footer.component';
import Navbar from '../../../components/global.components/navbar.component';

const PrivacyPolicyPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
                        </div>
                        <p className="text-lg opacity-90">Last Updated: December 2024</p>
                        <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            <p className="text-sm md:text-base leading-relaxed">
                                At <strong>NEXA – Next Level Learning</strong> ("NEXA", "we", "our", or "us"), your privacy is very important to us.
                                This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed mt-3">
                                By using NEXA, you agree to the practices described in this Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 py-8">

                    {/* Section 1 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#00B6C7] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                1. Information We Collect
                            </h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-4">
                                We collect different types of information depending on your role (student, tutor, institution, donor, admin):
                            </p>

                            {/* Subsection a */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-[#043345] mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    a. Personal Information
                                </h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Name, email address, phone number, age, and profile details.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Institution or organization details (for tutors/institutions).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Payment/donation details (for donors).</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Subsection b */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-[#009966] mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    b. Educational Information
                                </h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#009966] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Subjects of interest, enrolled courses, session history, and progress reports.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#009966] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Uploaded study materials and shared resources.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Subsection c */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#0D9AAC] mb-3 flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    c. Technical Information
                                </h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#0D9AAC] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Device type, browser, IP address, and usage data.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#0D9AAC] rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Cookies and similar tracking technologies to improve user experience.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#009966] text-white px-6 py-4">
                            <h2 className="text-xl font-bold">2. How We Use Your Information</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-4">We use your data to:</p>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Provide learning sessions, courses, and tutoring services.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Enable communication between students, tutors, and institutions.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Track learning progress and provide reports.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Process donations and ensure transparency.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Improve the platform through analytics.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Ensure platform safety and prevent misuse.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#0D9AAC] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                3. Sharing of Information
                            </h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-4">
                                We respect your privacy and do not sell or trade personal data. However, we may share information in these cases:
                            </p>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>With verified tutors/institutions</strong> (only what is needed for learning).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>With donors</strong> (impact metrics, not personal identities unless consented).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>With service providers</strong> (e.g., payment processors, cloud hosting).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>If required by law</strong> (e.g., legal investigations, safety concerns).</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#043345] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Lock className="w-5 h-5" />
                                4. Data Protection & Security
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>All user data is stored securely with encryption and restricted access.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Tutors and institutions undergo verification to ensure student safety.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Parents/guardians must supervise accounts of students under 18.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>We regularly monitor the system for suspicious activity.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#00B6C7] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Cookie className="w-5 h-5" />
                                5. Cookies & Tracking
                            </h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-4">We use cookies to:</p>
                            <ul className="space-y-3 text-slate-700 mb-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Remember your login and preferences.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Track usage patterns for platform improvement.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Personalize learning experiences.</span>
                                </li>
                            </ul>
                            <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded-lg">
                                You may disable cookies in your browser, but some features may not work properly.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#009966] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <UserCheck className="w-5 h-5" />
                                6. Your Rights
                            </h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-4">
                                Depending on your role and location, you may:
                            </p>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Access, update, or delete your personal information.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Withdraw consent for data processing.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Request a copy of your data.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Report any misuse or safety concerns.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Sections 7-9 in a grid layout for larger screens */}
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Section 7 */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-[#0D9AAC] text-white px-6 py-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    7. Children's Privacy
                                </h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <p className="text-slate-700 text-sm">
                                    NEXA is committed to protecting students under 18.
                                </p>
                                <p className="text-slate-700 text-sm">
                                    Accounts of minors must be supervised by parents/guardians or institutions.
                                </p>
                                <p className="text-slate-700 text-sm">
                                    We do not knowingly collect data from children without consent.
                                </p>
                            </div>
                        </div>

                        {/* Section 8 */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-[#043345] text-white px-6 py-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    8. Donations & Financial Info
                                </h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <p className="text-slate-700 text-sm">
                                    Donor details and payment information are kept confidential.
                                </p>
                                <p className="text-slate-700 text-sm">
                                    Financial transactions are processed securely via trusted third-party providers.
                                </p>
                                <p className="text-slate-700 text-sm">
                                    Donation history is accessible to donors through their dashboards.
                                </p>
                            </div>
                        </div>

                        {/* Section 9 */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-[#00B6C7] text-white px-6 py-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    9. Changes to Policy
                                </h3>
                            </div>
                            <div className="p-6">
                                <p className="text-slate-700 text-sm">
                                    We may update this Privacy Policy from time to time. Updates will be posted on this page,
                                    and continued use of NEXA means you accept the revised policy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white rounded-xl shadow-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/20">
                            <h2 className="text-xl font-bold">10. Contact Us</h2>
                        </div>
                        <div className="p-6">
                            <p className="mb-4">
                                If you have any questions, concerns, or requests regarding your privacy, please contact us at:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 flex-shrink-0" />
                                    <span>Email: nexa.nexgen@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 flex-shrink-0" />
                                    <span>Address: Colombo, Sri Lanka</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            Your privacy is important to us. We are committed to protecting your personal information and being transparent about our data practices.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicyPage;