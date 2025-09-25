import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

// Notification component
const Notification = ({ type, message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={`fixed top-4 right-4 z-[60] transform transition-all duration-500 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm ${type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                {type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="text-sm font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className={`ml-auto cursor-pointer ${type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
                        }`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Notification;