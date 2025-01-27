import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router";



// Remember that useEffect runs after initial render, so authState at the first
// run === undefined which is not strictly equal to null.
const ProtectedRoutes = () => {
    const [authState, setAuthState] = useState();

    const getAuthState = async () => {
        const response = await fetch("/api/users");
        const data = await response.json();
        setAuthState(data.username);
    }

    useEffect(() => {
        getAuthState();
    }, []);

    if (authState !== null) {
        return <Outlet />
    }

    return <Navigate to="/account/login" />;
}


export default ProtectedRoutes;
