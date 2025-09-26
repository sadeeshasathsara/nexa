import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ActionBox from './actionBox.component';

// Banner Component
const Banner = ({ backgroundImage, actionBoxProps, className = "" }) => {
    return (
        <div
            className={`relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden ${className}`}
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8">
                <ActionBox {...actionBoxProps} />
            </div>
        </div>
    );
};

export default Banner;