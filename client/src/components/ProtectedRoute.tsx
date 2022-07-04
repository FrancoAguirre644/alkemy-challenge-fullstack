import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {
    const isLoggedIn = !!localStorage.getItem("logged");

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

};

export default ProtectedRoute;