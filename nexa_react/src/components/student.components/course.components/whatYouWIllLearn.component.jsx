import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const WhatYoullLearn = ({ learningOutcomes, showAllByDefault = false }) => {
    const [showMore, setShowMore] = useState(showAllByDefault);

    // Show first 6 items by default, rest when expanded
    const visibleItems = showMore ? learningOutcomes : learningOutcomes.slice(0, 6);
    const hasMoreItems = learningOutcomes.length > 6;

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What you'll learn
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {visibleItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                                <Check className="w-3 h-3 text-white stroke-[3]" />
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {item}
                        </p>
                    </div>
                ))}
            </div>

            {hasMoreItems && (
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="flex cursor-pointer items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors bg-green-50 hover:bg-green-100 px-4 py-2 rounded-md"
                >
                    {showMore ? (
                        <>
                            Show less
                            <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Show more
                            <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default WhatYoullLearn;