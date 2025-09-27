import React from 'react';

const CourseIncludes = ({ courseData }) => {
    const courseIncludes = courseData?.includes || [];
    const relatedTopics = courseData?.relatedTopics || [];

    return (
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            {/* Explore Related Topics */}
            {relatedTopics.length > 0 && (
                <div className="p-3 pb-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                        Related topics
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {relatedTopics.map((topic, index) => (
                            <button
                                key={index}
                                className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* This Course Includes */}
            {courseIncludes.length > 0 && (
                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        This course includes:
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {courseIncludes.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex cursor-context-menu items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    {Icon && (
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-50 rounded-md flex items-center justify-center mt-0.5">
                                            <Icon className="w-4.5 h-4.5 text-green-600" />
                                        </div>
                                    )}
                                    <span className="text-[13px] text-gray-700 font-medium leading-relaxed">
                                        {item.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseIncludes;
