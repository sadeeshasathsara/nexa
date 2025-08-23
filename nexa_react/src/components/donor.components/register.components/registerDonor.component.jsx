import { Heart } from 'lucide-react';
import React from 'react'

const RegisterDonor = () => (
    <div className="bg-white rounded-3xl p-8 border border-rose-100">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Donor Registration</h2>
            <p className="text-gray-600">Support education through giving</p>
        </div>
        <div className="space-y-4">
            <input className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" placeholder="Full Name" />
            <input className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" placeholder="Email Address" />
            <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                Create Donor Account
            </button>
        </div>
    </div>
);

export default RegisterDonor