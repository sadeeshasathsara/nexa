import React from 'react';
import { Calendar, Clock, Users, Video, Wifi } from 'lucide-react';

const ClassCard = ({ classInfo }) => {
    const getStatusInfo = (status) => {
        switch (status) {
            case 'live':
                return {
                    color: 'bg-red-500',
                    text: 'LIVE NOW',
                    icon: <Wifi className="w-3 h-3" />,
                    pulse: true
                };
            case 'starting-soon':
                return {
                    color: 'bg-orange-500',
                    text: 'STARTING SOON',
                    icon: <Clock className="w-3 h-3" />,
                    pulse: true
                };
            case 'upcoming':
                return {
                    color: 'bg-blue-500',
                    text: 'UPCOMING',
                    icon: <Calendar className="w-3 h-3" />,
                    pulse: false
                };
            default:
                return {
                    color: 'bg-gray-500',
                    text: 'SCHEDULED',
                    icon: <Calendar className="w-3 h-3" />,
                    pulse: false
                };
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        if (date.toDateString() === today.toDateString()) {
            return `Today at ${timeString}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow at ${timeString}`;
        } else {
            return `${date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })} at ${timeString}`;
        }
    };

    const getJoinButtonText = (status) => {
        switch (status) {
            case 'live':
                return 'Join Now';
            case 'starting-soon':
                return 'Join Class';
            case 'upcoming':
                return 'Set Reminder';
            default:
                return 'Join Class';
        }
    };

    const getJoinButtonStyle = (status) => {
        switch (status) {
            case 'live':
                return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-200';
            case 'starting-soon':
                return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-200';
            default:
                return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200';
        }
    };

    const statusInfo = getStatusInfo(classInfo.status);

    return (
        <div className="flex-shrink-0 cursor-pointer w-80 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all transform hover:scale-102 duration-300 hover:shadow-lg hover:border-gray-200">
            <div className="relative h-44">
                <img
                    src={classInfo.image}
                    alt={classInfo.title}
                    className="w-full h-full object-cover"
                />

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                    <span className={`${statusInfo.color} text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${statusInfo.pulse ? 'animate-pulse' : ''}`}>
                        {statusInfo.icon}
                        {statusInfo.text}
                    </span>
                </div>

                {/* Duration */}
                <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    {classInfo.duration}
                </div>

                {/* Participant count overlay */}
                <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {classInfo.currentParticipants}/{classInfo.maxParticipants}
                </div>
            </div>

            <div className="p-4 flex flex-col">
                {/* Title wrapper with fixed height */}
                <div className="h-14 mb-3">
                    <h3 className="font-bold text-lg leading-tight overflow-hidden text-ellipsis line-clamp-2">
                        {classInfo.title}
                    </h3>
                </div>

                {/* Instructor wrapper with fixed height */}
                <div className="h-5 mb-3">
                    <p className="text-blue-600 text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                        with {classInfo.instructor}
                    </p>
                </div>

                {/* Description wrapper with fixed height */}
                <div className="h-10 mb-4">
                    <p className="text-gray-600 text-sm leading-tight overflow-hidden text-ellipsis line-clamp-2">
                        {classInfo.description}
                    </p>
                </div>

                {/* Schedule info */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDateTime(classInfo.scheduledTime)}</span>
                    </div>
                </div>

                {/* Join button */}
                <div className="h-10 flex items-center">
                    <button className={`w-full ${getJoinButtonStyle(classInfo.status)} text-white text-sm font-semibold py-2.5 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-102 cursor-pointer transition-all duration-300 border border-opacity-20 border-white`}>
                        {getJoinButtonText(classInfo.status)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;