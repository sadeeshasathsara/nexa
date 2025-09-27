import React, { useState } from 'react';
import { CheckCircle, XCircle, Target, Users, BookOpen, Clock, Star, ChevronRight } from 'lucide-react';

const RequirementsDescription = ({ courseData }) => {
    const [activeTab, setActiveTab] = useState('description');

    const description = courseData?.description || {};
    const requirements = courseData?.requirements || {};
    const stats = courseData?.stats || {};

    const TabButton = ({ id, label, isActive, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`px-4 py-2 font-medium text-sm rounded-md transition-all duration-200 ${isActive
                    ? 'bg-emerald-100 text-emerald-800 shadow-sm'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            {/* Course Stats */}
            {stats && (stats.duration || stats.lessons) && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-100">
                    <div className="grid grid-cols-2 gap-3">
                        {stats.duration && (
                            <div className="text-center">
                                <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg mb-2 mx-auto">
                                    <Clock className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="text-lg font-bold text-gray-900">{stats.duration}</div>
                                <div className="text-xs text-gray-600">Duration</div>
                            </div>
                        )}
                        {stats.lessons && (
                            <div className="text-center">
                                <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-lg mb-2 mx-auto">
                                    <BookOpen className="w-4 h-4 text-teal-600" />
                                </div>
                                <div className="text-lg font-bold text-gray-900">{stats.lessons}</div>
                                <div className="text-xs text-gray-600">Lessons</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm h-96 md:h-[460px] overflow-y-auto custom-scrollbar">
                <div className="flex border-b border-gray-100 bg-gray-50/50 p-1">
                    <TabButton
                        id="description"
                        label="Description"
                        isActive={activeTab === 'description'}
                        onClick={setActiveTab}
                    />
                    <TabButton
                        id="requirements"
                        label="Requirements"
                        isActive={activeTab === 'requirements'}
                        onClick={setActiveTab}
                    />
                </div>

                <div className="p-4">
                    {/* Description Tab */}
                    {activeTab === 'description' && description && (
                        <div className="space-y-6">
                            {description.overview && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Overview</h3>
                                    <p className="text-gray-700 leading-relaxed">{description.overview}</p>
                                </div>
                            )}

                            {description.whatYouWillLearn?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Target className="w-4 h-4 text-emerald-600" />
                                        What You'll Learn
                                    </h3>
                                    <div className="space-y-2">
                                        {description.whatYouWillLearn.map((item, index) => (
                                            <div key={index} className="flex items-start gap-2 group">
                                                <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                                                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {description.targetAudience?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-teal-600" />
                                        Who This Course Is For
                                    </h3>
                                    <div className="space-y-2">
                                        {description.targetAudience.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 bg-teal-50 rounded-md border border-teal-100"
                                            >
                                                <ChevronRight className="w-3 h-3 text-teal-600 flex-shrink-0" />
                                                <span className="text-sm text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Requirements Tab */}
                    {activeTab === 'requirements' && requirements && (
                        <div className="space-y-6">
                            {requirements.required?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        Required
                                    </h3>
                                    <div className="space-y-2">
                                        {requirements.required.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-2 p-3 bg-emerald-50 rounded-md border border-emerald-200"
                                            >
                                                <div className="flex-shrink-0 w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center mt-0.5">
                                                    <CheckCircle className="w-3 h-3 text-emerald-700" />
                                                </div>
                                                <span className="text-sm text-gray-800 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {requirements.recommended?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Star className="w-4 h-4 text-blue-600" />
                                        Recommended
                                    </h3>
                                    <div className="space-y-2">
                                        {requirements.recommended.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-2 p-3 bg-blue-50 rounded-md border border-blue-200"
                                            >
                                                <div className="flex-shrink-0 w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center mt-0.5">
                                                    <Star className="w-3 h-3 text-blue-700" />
                                                </div>
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {requirements.notRequired?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <XCircle className="w-4 h-4 text-gray-600" />
                                        Not Required
                                    </h3>
                                    <div className="bg-gray-50 rounded-md border border-gray-200 p-3">
                                        <p className="text-sm text-gray-700 mb-3 font-medium">You don't need:</p>
                                        <div className="space-y-2">
                                            {requirements.notRequired.map((item, index) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <div className="flex-shrink-0 w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center mt-0.5">
                                                        <XCircle className="w-3 h-3 text-gray-600" />
                                                    </div>
                                                    <span className="text-sm text-gray-600">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequirementsDescription;
