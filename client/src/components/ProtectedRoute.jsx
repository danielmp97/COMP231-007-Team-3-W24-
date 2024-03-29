import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles, userRole, ...props }) => {
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }
    return <Route {...props} element={<Component />} />;
} 

export default ProtectedRoute;


