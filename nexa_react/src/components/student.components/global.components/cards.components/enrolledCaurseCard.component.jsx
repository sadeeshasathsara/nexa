import React from 'react';
import { Play, Clock, BookOpen, Award, Calendar } from 'lucide-react';

const EnrolledCoursesCard = ({ course }) => {
    const progressPercentage = Math.round((course.completedLessons / course.totalLessons) * 100);

    const formatTimeRemaining = (minutes) => {
        if (minutes < 60) return `${minutes}m left`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m left` : `${hours}h left`;
    };

    const getDaysLeft = (dueDate) => {
        if (!dueDate) return null;
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return '1 day left';
        return `${diffDays} days left`;
    };

    return (
        <div className="flex-shrink-0 cursor-pointer w-80 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200">
            <div className="relative h-40">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />

                {/* Progress overlay */}
                <div className="absolute inset-0 bg-black/20">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                        <div
                            className="h-full bg-green-400 transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Continue button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <button className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                        <Play className="w-4 h-4 fill-current" />
                        Continue Learning
                    </button>
                </div>

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                        In Progress
                    </span>
                </div>

                {/* Time remaining */}
                {course.timeRemaining && (
                    <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeRemaining(course.timeRemaining)}
                    </div>
                )}
            </div>

            <div className="p-4">
                {/* Title wrapper with fixed height */}
                <div className="h-14 mb-3">
                    <h3 className="font-bold text-lg leading-tight overflow-hidden text-ellipsis line-clamp-2">
                        {course.title}
                    </h3>
                </div>

                {/* Progress section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-green-600">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                        <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                        <span>{course.completedLessons}/{course.totalLessons}</span>
                    </div>
                </div>

                {/* Course stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{course.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Certificate</span>
                    </div>
                </div>

                {/* Footer content with fixed height */}
                <div className="h-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Last accessed {course.lastAccessed}
                    </div>
                    {course.dueDate && (
                        <div className="flex items-center gap-1 text-xs">
                            <Calendar className="w-3 h-3 text-orange-500" />
                            <span className={`${getDaysLeft(course.dueDate) === 'Overdue' ? 'text-red-500' : 'text-orange-500'} font-medium`}>
                                {getDaysLeft(course.dueDate)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrolledCoursesCard;