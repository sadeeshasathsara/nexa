import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToDefaultRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/v1');
    }, [])

    return (
        <></>
    )
}

export default RedirectToDefaultRoute