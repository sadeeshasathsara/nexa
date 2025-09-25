import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    Check,
    X,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';


// Portal component for rendering popup in body
const Portal = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;
    return createPortal(children, document.body);
};

export default Portal;