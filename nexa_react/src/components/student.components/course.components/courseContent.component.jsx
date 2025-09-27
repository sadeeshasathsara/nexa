import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, FileText, Image, Download, Clock, Lock } from 'lucide-react';

const CourseContent = ({ courseData }) => {
    const [expandedSections, setExpandedSections] = useState(new Set());

    const sections = courseData?.sections || [];

    // Calculate totals
    const totalSections = sections.length;
    const totalLectures = sections.reduce((sum, section) => sum + section.lectures.length, 0);
    const totalMinutes = sections.reduce((sum, section) => sum + section.duration, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    const toggleSection = (sectionId) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    };

    React.useEffect(() => {
        toggleSection(sections[0]?.id);
    }, []);

    const getResourceIcon = (type) => {
        switch (type) {
            case 'video':
                return Play;
            case 'pdf':
                return FileText;
            case 'image':
                return Image;
            case 'download':
                return Download;
            default:
                return FileText;
        }
    };

    const getResourceColor = (type) => {
        switch (type) {
            case 'video':
                return 'text-emerald-600 bg-emerald-50';
            case 'pdf':
                return 'text-green-600 bg-green-50';
            case 'image':
                return 'text-teal-600 bg-teal-50';
            case 'download':
                return 'text-lime-600 bg-lime-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const formatDuration = (minutes) => {
        if (minutes === 0) return '';
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Course Content</h2>
                <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700">{totalSections} sections</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span className="text-gray-700">{totalLectures} lectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">
                            {totalHours}h {remainingMinutes}m total
                        </span>
                    </div>
                </div>
            </div>

            {/* Sections List */}
            <div className="divide-y divide-gray-100">
                {sections.map((section) => {
                    const isExpanded = expandedSections.has(section.id);
                    const sectionHours = Math.floor(section.duration / 60);
                    const sectionMinutes = section.duration % 60;
                    const sectionDuration =
                        sectionMinutes > 0 ? `${sectionHours}h ${sectionMinutes}m` : `${sectionHours}h`;

                    return (
                        <div key={section.id} className="bg-white">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50 hover:to-emerald-25 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        {isExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-emerald-600 transition-transform duration-200" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-emerald-600 transition-transform duration-200 group-hover:translate-x-1" />
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-emerald-800 transition-colors duration-200">
                                            {section.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                                {section.lectures.length} lectures
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-emerald-500" />
                                                {sectionDuration}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                </div>
                            </button>

                            {/* Section Content */}
                            {isExpanded && (
                                <div className="px-6 pb-4 bg-gradient-to-b from-gray-50/30 to-transparent">
                                    <div className="ml-9 space-y-1">
                                        {section.lectures.map((lecture) => {
                                            const ResourceIcon = getResourceIcon(lecture.type);
                                            const resourceColor = getResourceColor(lecture.type);
                                            return (
                                                <div
                                                    key={lecture.id}
                                                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-gray-200 group"
                                                >
                                                    <div
                                                        className={`flex-shrink-0 w-6 h-6 rounded-md ${resourceColor} flex items-center justify-center`}
                                                    >
                                                        <ResourceIcon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-200 truncate">
                                                            {lecture.title}
                                                        </p>
                                                        {lecture.duration > 0 && (
                                                            <div className="flex items-center gap-1 mt-0.5">
                                                                <Clock className="w-3 h-3 text-gray-400" />
                                                                <span className="text-xs text-gray-500">
                                                                    {formatDuration(lecture.duration)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        {lecture.preview ? (
                                                            <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full border border-emerald-200">
                                                                Preview
                                                            </span>
                                                        ) : (
                                                            <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center">
                                                                <Lock className="w-3.5 h-3.5 text-red-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseContent;
