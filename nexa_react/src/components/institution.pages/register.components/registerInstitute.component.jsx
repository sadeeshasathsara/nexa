import { School } from 'lucide-react';
import React from 'react'

const RegisterInstitute = () => (
    <div className="bg-white rounded-3xl p-8 border border-purple-100">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <School className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Institute Registration</h2>
            <p className="text-gray-600">Manage your educational institution</p>
        </div>
        <div className="space-y-4">
            <input className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Institution Name" />
            <input className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Contact Email" />
            <button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                Create Institute Account
            </button>
        </div>
    </div>
);

export default RegisterInstitute