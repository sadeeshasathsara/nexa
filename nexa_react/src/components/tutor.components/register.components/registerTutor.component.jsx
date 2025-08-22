import { BookOpen } from 'lucide-react';
import React from 'react'

const RegisterTutor = () => (
    <div className="bg-white rounded-3xl p-8 border border-emerald-100">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tutor Registration</h2>
            <p className="text-gray-600">Share your knowledge with students</p>
        </div>
        <div className="space-y-4">
            <input className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Full Name" />
            <input className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Email Address" />
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                Create Tutor Account
            </button>
        </div>
    </div>
);

export default RegisterTutor