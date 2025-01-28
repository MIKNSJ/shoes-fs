import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router";



// Remember that useEffect runs after initial render, so authState at the first
// run === undefined which is not strictly equal to null.
export default function ProtectedRoutes({authState}) {
    if (authState !== null) {
        return <Outlet />
    }

    alert("You must be signed in to view this page.")
    return <Navigate to="/account/login" />;
}
