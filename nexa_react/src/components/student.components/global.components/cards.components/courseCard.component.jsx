import React, { useState, useRef, useEffect } from 'react';
import { Star, Clock } from 'lucide-react';

const CourseCard = ({ course }) => (
    <div className="flex-shrink-0 cursor-pointer w-72 bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 transform hover:scale-102">
        <div className="relative h-40">
            <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {course.duration}
            </div>
        </div>
        <div className="p-4 flex flex-col">
            {/* Title wrapper with fixed height */}
            <div className="h-14 mb-2">
                <h3 className="font-bold text-lg leading-tight overflow-hidden text-ellipsis line-clamp-2">
                    {course.title}
                </h3>
            </div>

            {/* Subtitle/Description wrapper with fixed height */}
            <div className="h-10 mb-3">
                <p className="text-gray-600 text-sm leading-tight overflow-hidden text-ellipsis line-clamp-2">
                    {course.description}
                </p>
            </div>

            {/* Course coordinator wrapper with fixed height */}
            <div className="h-5 mb-3">
                <p className="text-gray-500 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                    By {course.coordinator}
                </p>
            </div>

            {/* Rating and Enroll section with fixed height */}
            <div className="h-8 flex items-center justify-between">
                <div className="flex items-center gap-1 overflow-hidden">
                    <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                    <span className="text-sm font-medium whitespace-nowrap">{course.rating}</span>
                    <span className="text-gray-500 text-sm whitespace-nowrap">({course.reviews})</span>
                </div>
                <button className="bg-gradient-to-r cursor-pointer bg-[#00c951] hover:bg-[#02aa45] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-300">
                    Enroll Now
                </button>
            </div>
        </div>
    </div>
);

export default CourseCard;