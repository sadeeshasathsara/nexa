import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";
import { useGlobalLoading } from "./loading.components/loading.component";

// Map roles to frontend base paths
const ROLE_ROUTES = {
    admin: "/v1/admin",
    donor: "/v1/donor",
    institution: "/v1/institution",
    student: "/v1/student",
    tutor: "/v1/tutor",
};

function ProtectedRoute({ allowedRoles }) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const { setGlobalLoading } = useGlobalLoading();

    useEffect(() => {
        setGlobalLoading(loading);
    }, [loading, setGlobalLoading]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/auth`, { withCredentials: true });
                const role = res.data.data;

                setUserRole(role);

                if (allowedRoles.includes(role)) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (err) {
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [allowedRoles]);

    if (loading) return <div>Loading...</div>;

    if (!authorized) return <Navigate to="/v1/login" replace />;

    // ✅ Role matches, render child route
    return <Outlet context={{ userRole }} />;
}

export default ProtectedRoute;
