import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router";



const ProtectedRoutes = () => {
    const [authState, setAuthState] = useState(null);

    const getAuthState = async () => {
        const response = await fetch("/api/users");
        const data = await response.json();
        console.log(data.username)
        setAuthState(data.username);
        return;
    }

    const loadAuthState = async () => {
        const data = await getAuthState();
        setAuthState(data);
    }

    useEffect(() => {
        getAuthState();
    }, [authState]);

    console.log(authState);
    if (authState !== null) {
        return <Outlet />
    }

    return <Navigate to="/account/login" />;
}


export default ProtectedRoutes;
