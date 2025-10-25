import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * RedirectToDefaultRoute Component
 *
 * Automatically redirects the user to the default base route (`/v1`) when mounted.
 * Useful for root paths or unknown routes to ensure the user lands on a proper entry point.
 *
 * @component
 * @example
 * // In your App or Routes file
 * <Route path="/" element={<RedirectToDefaultRoute />} />
 */
const RedirectToDefaultRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect user to default route
        navigate('/v1');
    }, [navigate]); // include navigate in dependencies for best practices

    // Render nothing as this component only performs redirection
    return null;
};

export default RedirectToDefaultRoute;
