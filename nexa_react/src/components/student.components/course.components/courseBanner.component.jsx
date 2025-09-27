import React, { useState, useEffect } from 'react';
import { Play, Star, Users, Clock, Calendar, Globe, ChevronRight, PlayCircle, User } from 'lucide-react';

const CourseBanner = ({ courseData }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const bannerHeight = 500; // Approximate banner height
            setIsSticky(window.scrollY > bannerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    const formatLastUpdated = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-1">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-green-400 text-green-400" />
                ))}
                {hasHalfStar && (
                    <Star className="w-3 h-3 fill-green-400/50 text-green-400" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-gray-300" />
                ))}
            </div>
        );
    };

    const InstructorAvatar = ({ avatar, name }) => {
        const [error, setError] = useState(false);

        return avatar && !error ? (
            <img
                src={avatar}
                alt={name}
                className="w-8 h-8 rounded-full border-2 border-green-400"
                onError={() => setError(true)}
            />
        ) : (
            <User className="w-8 h-8 rounded-full border-2 border-green-400 text-green-400" />
        );
    };

    // Sample course data for demo
    const sampleCourseData = courseData || {
        title: "Complete Web Development Bootcamp",
        description: "Learn to build modern web applications from scratch using the latest technologies and best practices. Master HTML, CSS, JavaScript, React, and more in this comprehensive course.",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        videoThumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        introVideo: true,
        rating: 4.8,
        totalRatings: 15420,
        totalLearners: 89340,
        duration: 780, // minutes
        previewDuration: 3, // minutes
        lastUpdated: "2024-01-15",
        language: "English",
        instructors: [
            {
                id: 1,
                name: "Sarah Johnson",
                title: "Senior Full-Stack Developer",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                id: 2,
                name: "Mike Chen",
                title: "React Specialist",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            }
        ]
    };

    const data = sampleCourseData;

    return (
        <>
            {/* Sticky Top Bar */}
            <div className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg transition-all duration-300 ${isSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}>
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        {/* Left Side - Course Info */}
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <img
                                src={data.thumbnail}
                                alt={data.title}
                                className="w-12 h-12 rounded-lg object-cover border border-gray-600"
                            />
                            <div className="min-w-0 flex-1">
                                <h2 className="text-white font-semibold text-lg truncate">
                                    {data.title}
                                </h2>
                                <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        {renderStars(data.rating)}
                                        <span className="text-green-400 font-medium ml-1">
                                            {data.rating}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-300">
                                        <Users className="w-3 h-3" />
                                        <span>{(data.totalLearners / 1000).toFixed(0)}k students</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-300">
                                        <Clock className="w-3 h-3" />
                                        <span>{formatDuration(data.duration)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Enroll Button */}
                        <div className="ml-4">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center gap-2 cursor-pointer">
                                    <span className="font-bold">Enroll Now</span>
                                    <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Banner */}
            <div className="relative min-h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={data.thumbnail}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Course Information */}
                        <div className="text-white space-y-4">
                            {/* Course Title */}
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-3">
                                    {data.title}
                                </h1>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {data.description}
                                </p>
                            </div>

                            {/* Stats Row */}
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                    {renderStars(data.rating)}
                                    <span className="font-medium text-green-400">
                                        {data.rating}
                                    </span>
                                    <span className="text-gray-400">
                                        ({data.totalRatings.toLocaleString()} ratings)
                                    </span>
                                </div>

                                {/* Learners */}
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-300">
                                        {data.totalLearners.toLocaleString()} students
                                    </span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-300">
                                        {formatDuration(data.duration)}
                                    </span>
                                </div>
                            </div>

                            {/* Instructor(s) */}
                            <div>
                                <h3 className="text-base font-semibold mb-2">Created by</h3>
                                <div className="flex flex-wrap items-center gap-4">
                                    {data.instructors.map((instructor, index) => (
                                        <div key={instructor.id} className="flex items-center gap-2">
                                            <InstructorAvatar avatar={instructor.avatar} name={instructor.name} />
                                            <div>
                                                <a
                                                    href={`/instructor/${instructor.id}`}
                                                    className="text-green-400 hover:text-green-300 font-medium text-sm flex items-center gap-1 transition-colors"
                                                >
                                                    {instructor.name}
                                                    <ChevronRight className="w-3 h-3" />
                                                </a>
                                                <p className="text-gray-400 text-xs">
                                                    {instructor.title}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Course Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-300">
                                        Last updated {formatLastUpdated(data.lastUpdated)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-300">
                                        {data.language}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Video Player */}
                        <div className="flex flex-col justify-center items-center space-y-6">
                            {data.introVideo ? (
                                <div className="relative max-w-md w-full">
                                    <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                        {!isVideoPlaying ? (
                                            <>
                                                <img
                                                    src={data.videoThumbnail || data.thumbnail}
                                                    alt="Course preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <button
                                                        onClick={() => setIsVideoPlaying(true)}
                                                        className="group flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                                                    >
                                                        <PlayCircle className="w-12 h-12 text-white group-hover:text-blue-300 transition-colors" />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                                                        <p className="text-white text-sm font-medium">Course Preview</p>
                                                        <p className="text-gray-300 text-xs">
                                                            {formatDuration(data.previewDuration)} preview
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                                <div className="text-center text-white">
                                                    <PlayCircle className="w-12 h-12 mx-auto mb-2 text-green-400" />
                                                    <p className="text-sm">Video Player</p>
                                                    <p className="text-xs text-gray-400">(Integration needed)</p>
                                                    <button
                                                        onClick={() => setIsVideoPlaying(false)}
                                                        className="mt-2 px-4 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                                                    >
                                                        Close Preview
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-md w-full">
                                    <div className="aspect-video bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-gray-700 flex items-center justify-center">
                                        <div className="text-center text-gray-400">
                                            <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No preview available</p>
                                            <p className="text-sm">Course content will be available after enrollment</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Enroll Now Button */}
                            <div className="max-w-md w-full">
                                <button className="group relative w-full overflow-hidden bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:via-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative flex items-center cursor-pointer justify-center gap-3">
                                        <span className="text-lg font-extrabold tracking-wide">Enroll Now</span>
                                        <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                    <div className="absolute inset-0 ring-2 ring-green-400/50 rounded-xl opacity-0 group-hover:opacity-100 group-hover:ring-green-300/70 transition-all duration-300"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default CourseBanner;