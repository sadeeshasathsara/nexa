import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";

export default function StudentDetailsStep({ formData, setFormData, onNext, onPrev }) {
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Academic Info</h2>
            </div>
            <p className="text-gray-600 mb-6">Tell us about your studies</p>

            <div className="space-y-4">
                <input
                    name="school"
                    placeholder="School/University"
                    value={formData.school || ""}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <input
                    name="grade"
                    placeholder="Grade/Year"
                    value={formData.grade || ""}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={onPrev}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
}