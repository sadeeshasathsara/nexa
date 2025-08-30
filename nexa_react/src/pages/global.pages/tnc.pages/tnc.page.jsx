import React from 'react';
import { FileText, Shield, Users, CreditCard, AlertCircle, Mail, MapPin } from 'lucide-react';
import Navbar from '../../../components/global.components/navbar.component';
import Footer from '../../../components/global.components/footer.component';

const TncPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Terms and Conditions</h1>
                        </div>
                        <p className="text-lg opacity-90">Last Updated: December 2024</p>
                        <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            <p className="text-sm md:text-base leading-relaxed">
                                Welcome to <strong>NEXA – Next Level Learning</strong> ("NEXA", "we", "our", or "us").
                                By accessing or using our platform, you agree to comply with and be bound by the following
                                Terms and Conditions. Please read them carefully.
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
                                <Shield className="w-5 h-5" />
                                1. Acceptance of Terms
                            </h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 leading-relaxed">
                                By registering, accessing, or using NEXA, you agree to these Terms and our Privacy Policy.
                                If you do not agree, you may not use the platform.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#009966] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                2. Eligibility
                            </h2>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>Students</strong> must have consent from a parent/guardian if under 18.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>Tutors</strong> must provide accurate qualifications and agree to verification.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>Institutions</strong> must register under a verified representative.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>Donors</strong> must provide accurate details for transactions.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00FF99] rounded-full mt-2 flex-shrink-0"></div>
                                    <span><strong>Administrators</strong> are appointed by NEXA for oversight and moderation.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#0D9AAC] text-white px-6 py-4">
                            <h2 className="text-xl font-bold">3. User Responsibilities</h2>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Provide accurate information during registration.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Use the platform only for lawful educational purposes.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Respect other users in communication (chat, forums, classes).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Do not share offensive, harmful, or copyrighted material without permission.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#00B6C7] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Keep login credentials secure.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#043345] text-white px-6 py-4">
                            <h2 className="text-xl font-bold">4. Platform Services</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-4">NEXA provides:</p>
                            <ul className="space-y-3 text-slate-700 mb-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Access to courses, classes, and sessions.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Real-time chat and video tools.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Progress tracking and reports.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#043345] rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Tools for tutors, institutions, donors, and admins.</span>
                                </li>
                            </ul>
                            <p className="text-slate-600 text-sm">
                                We may update, modify, or discontinue features at any time.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#009966] text-white px-6 py-4">
                            <h2 className="text-xl font-bold">5. Content Policy</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-slate-700">
                                Students and tutors may share educational resources, but they remain responsible for the accuracy and legality of their content.
                            </p>
                            <p className="text-slate-700">
                                NEXA reserves the right to remove any inappropriate or harmful content.
                            </p>
                            <p className="text-slate-700">
                                By uploading content, you grant NEXA a non-exclusive license to use and display it within the platform.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#00B6C7] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                6. Donations & Payments
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-slate-700">
                                Donations made through NEXA are non-refundable.
                            </p>
                            <p className="text-slate-700">
                                Donors will have access to dashboards showing the impact of their contributions.
                            </p>
                            <p className="text-slate-700">
                                NEXA ensures transparency in fund allocation but is not liable for third-party payment processing issues.
                            </p>
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-[#0D9AAC] text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                7. Safety & Privacy
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-slate-700">
                                All tutors and institutions are subject to verification for student safety.
                            </p>
                            <p className="text-slate-700">
                                Private information will not be shared without consent, except as required by law.
                            </p>
                            <p className="text-slate-700">
                                Students under 18 must use the platform under parental or institutional supervision.
                            </p>
                        </div>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-red-500 text-white px-6 py-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                8. Prohibited Activities
                            </h2>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 mb-4">Users must not:</p>
                            <ul className="space-y-3 text-slate-700 mb-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Use NEXA for commercial or non-educational purposes.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Engage in harassment, hate speech, or exploitation.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Attempt to hack, disrupt, or misuse the system.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Impersonate another person or organization.</span>
                                </li>
                            </ul>
                            <p className="text-red-600 font-medium text-sm">
                                Violation may result in account suspension or termination.
                            </p>
                        </div>
                    </div>

                    {/* Sections 9-12 in a grid layout for larger screens */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Section 9 */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-[#043345] text-white px-6 py-4">
                                <h3 className="text-lg font-bold">9. Limitation of Liability</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <p className="text-slate-700 text-sm">
                                    NEXA is an educational facilitator and does not guarantee academic success.
                                </p>
                                <p className="text-slate-700 text-sm">
                                    We are not liable for any disputes between students, tutors, institutions, or donors.
                                </p>
                                <p className="text-slate-700 text-sm">
                                    NEXA is not responsible for technical issues, downtime, or data loss.
                                </p>
                            </div>
                        </div>

                        {/* Section 10 */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-[#009966] text-white px-6 py-4">
                                <h3 className="text-lg font-bold">10. Termination of Use</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-slate-700 text-sm">
                                    NEXA may suspend or terminate accounts that violate these Terms. Users may delete
                                    their accounts anytime by contacting support.
                                </p>
                            </div>
                        </div>

                        {/* Section 11 */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-[#0D9AAC] text-white px-6 py-4">
                                <h3 className="text-lg font-bold">11. Changes to Terms</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-slate-700 text-sm">
                                    We may update these Terms periodically. Continued use of the platform after
                                    changes constitutes acceptance.
                                </p>
                            </div>
                        </div>

                        {/* Section 12 */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-[#00B6C7] text-white px-6 py-4">
                                <h3 className="text-lg font-bold">12. Governing Law</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-slate-700 text-sm">
                                    These Terms shall be governed by and interpreted in accordance with the laws of [Your Country].
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gradient-to-r from-[#043345] to-[#0D9AAC] text-white rounded-xl shadow-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/20">
                            <h2 className="text-xl font-bold">13. Contact Us</h2>
                        </div>
                        <div className="p-6">
                            <p className="mb-4">
                                If you have questions or concerns about these Terms, please contact us at:
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
                            By using NEXA, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TncPage;