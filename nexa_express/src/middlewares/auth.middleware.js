// Minimal auth middleware to unblock server. Replace with real JWT checks later.

export const protect = (req, res, next) => {
    next();
};

export const authorize = () => (req, res, next) => {
    next();
};

export const optionalAuth = (req, res, next) => {
    next();
};



