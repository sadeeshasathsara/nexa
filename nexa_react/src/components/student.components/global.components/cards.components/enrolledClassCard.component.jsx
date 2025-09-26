import React from 'react';
import { Clock, Calendar } from 'lucide-react';

const EnrolledClassCard = ({ classInfo }) => {
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const now = new Date();
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const timeDiff = date - now;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (date.toDateString() === today.toDateString()) {
            if (hoursDiff < 0) {
                return 'Class ended';
            } else if (hoursDiff < 1) {
                const minutesDiff = Math.floor(timeDiff / (1000 * 60));
                return minutesDiff <= 5 ? 'Starting now' : `${minutesDiff}m left`;
            }
            return `${timeString}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow ${timeString}`;
        } else {
            return `${date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })} ${timeString}`;
        }
    };

    const getTimeUrgency = (scheduledTime) => {
        const now = new Date();
        const classTime = new Date(scheduledTime);
        const timeDiff = classTime - now;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 0) return 'past';
        if (hoursDiff <= 0.1) return 'starting'; // within 6 minutes
        if (hoursDiff <= 1) return 'urgent';
        if (hoursDiff <= 24) return 'soon';
        return 'upcoming';
    };

    const getStatusInfo = (urgency) => {
        switch (urgency) {
            case 'starting':
                return {
                    bgColor: 'bg-gradient-to-r from-red-50 to-red-100',
                    borderColor: 'border-red-500',
                    badgeColor: 'bg-red-500',
                    badgeText: 'LIVE',
                    textColor: 'text-red-700'
                };
            case 'urgent':
                return {
                    bgColor: 'bg-gradient-to-r from-orange-50 to-orange-100',
                    borderColor: 'border-orange-500',
                    badgeColor: 'bg-orange-500',
                    badgeText: 'SOON',
                    textColor: 'text-orange-700'
                };
            case 'soon':
                return {
                    bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100',
                    borderColor: 'border-blue-500',
                    badgeColor: 'bg-blue-500',
                    badgeText: 'TODAY',
                    textColor: 'text-blue-700'
                };
            case 'past':
                return {
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-300',
                    badgeColor: 'bg-gray-400',
                    badgeText: 'ENDED',
                    textColor: 'text-gray-500'
                };
            default:
                return {
                    bgColor: 'bg-white',
                    borderColor: 'border-gray-200',
                    badgeColor: 'bg-gray-500',
                    badgeText: 'UPCOMING',
                    textColor: 'text-gray-600'
                };
        }
    };

    const urgency = getTimeUrgency(classInfo.scheduledTime);
    const statusInfo = getStatusInfo(urgency);

    return (
        <div className={`${statusInfo.bgColor} rounded-xl border-2 ${statusInfo.borderColor} hover:shadow-md transition-all duration-300 cursor-pointer h-32 w-72 flex-shrink-0 transform hover:scale-105`}>
            {/* Status Badge */}
            <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                    <span className={`${statusInfo.badgeColor} text-white px-2 py-1 rounded-full text-xs font-bold ${urgency === 'starting' || urgency === 'urgent' ? 'animate-pulse' : ''}`}>
                        {statusInfo.badgeText}
                    </span>
                </div>

                {/* Class Image */}
                <div className="h-16 w-full rounded-t-xl overflow-hidden">
                    <img
                        src={classInfo.image}
                        alt={classInfo.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Class Info */}
            <div className="p-3 h-16 flex justify-between">
                <div>
                    <h4 className="font-bold text-sm text-gray-900 leading-tight line-clamp-1 mb-1">
                        {classInfo.title}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">
                        by {classInfo.instructor}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs font-semibold ${statusInfo.textColor}`}>
                            {formatDateTime(classInfo.scheduledTime)}
                        </span>
                    </div>

                    {urgency === 'starting' && (
                        <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrolledClassCard;