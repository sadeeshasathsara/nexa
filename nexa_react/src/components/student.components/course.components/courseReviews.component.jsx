import React, { useState } from 'react';

const CourseReviews = ({ data }) => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [helpfulVotes, setHelpfulVotes] = useState({});
    const [showAllReviews, setShowAllReviews] = useState(false);

    const { reviews = [], ratingDistribution = {}, averageRating = 0 } = data || {};

    const totalReviews = Object.values(ratingDistribution).reduce(
        (sum, count) => sum + count,
        0
    );

    const handleHelpfulClick = (reviewId) => {
        setHelpfulVotes((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId],
        }));
    };

    const renderStars = (rating, size = 'small') => {
        const sizeClass = size === 'large' ? 'w-6 h-6' : 'w-4 h-4';
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`${sizeClass} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            } fill-current`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                    {rating.toFixed(1)}
                </span>
            </div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const filteredReviews =
        selectedFilter === 'all'
            ? reviews
            : reviews.filter((r) => r.rating === parseInt(selectedFilter));

    const visibleReviews = showAllReviews
        ? filteredReviews
        : filteredReviews.slice(0, 3);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Student Reviews</h2>

                {/* Rating Overview */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Overall Rating */}
                    <div className="flex items-center space-x-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                {averageRating}
                            </div>
                            {renderStars(averageRating, 'small')}
                            <p className="text-xs text-gray-600 mt-1">
                                {totalReviews.toLocaleString()} reviews
                            </p>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const percentage =
                                totalReviews > 0
                                    ? (ratingDistribution[rating] / totalReviews) * 100
                                    : 0;
                            return (
                                <div key={rating} className="flex items-center space-x-2">
                                    <span className="text-xs font-medium text-gray-700 w-2">
                                        {rating}
                                    </span>
                                    <svg
                                        className="w-3 h-3 text-yellow-400 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-600 w-6">
                                        {ratingDistribution[rating]}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {['all', '5', '4', '3', '2', '1'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedFilter === filter
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                                }`}
                        >
                            {filter === 'all' ? 'All Reviews' : `${filter} Stars`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {visibleReviews.map((review) => (
                    <div
                        key={review.id}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                        <div className="flex items-start space-x-3">
                            {/* User Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </div>

                            {/* Review Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            {review.user.name}
                                        </h3>
                                        {review.user.verified && (
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                                <svg
                                                    className="w-2 h-2 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {formatDate(review.date)}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2 mb-2">
                                    {renderStars(review.rating)}
                                </div>

                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    {review.title}
                                </h4>
                                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                                    {review.content}
                                </p>

                                {/* Tags */}
                                {review.tags && review.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {review.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Helpful Button */}
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleHelpfulClick(review.id)}
                                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${helpfulVotes[review.id]
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m-3-6l-2-2m0 0l-2-2m2 2v6"
                                            />
                                        </svg>
                                        <span>
                                            Helpful ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More/Less Button */}
            {filteredReviews.length > 3 && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="inline-flex cursor-pointer items-center px-4 py-2 border border-emerald-300 rounded-md shadow-sm bg-white text-emerald-700 hover:bg-emerald-50 transition-colors text-sm font-medium"
                    >
                        {showAllReviews
                            ? 'Show Less Reviews'
                            : `Show All ${filteredReviews.length} Reviews`}
                        <svg
                            className={`ml-2 w-3 h-3 transform transition-transform ${showAllReviews ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseReviews;
