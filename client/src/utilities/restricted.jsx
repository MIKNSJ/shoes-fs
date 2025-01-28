import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router";



export default function RestrictedRoutes({authState}) {
    if (authState === null || authState === undefined) {
        return <Outlet />
    }

    alert("You are already signed in.");
    return <Navigate to="/" />;
}
