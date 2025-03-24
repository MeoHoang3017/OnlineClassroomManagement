import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface AuthProtectedProps {
    children: React.ReactNode;
    allow?: string;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children, allow = "Student" }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const { user } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allow === "Teacher" && (!user || user.role !== "Teacher")) return <Navigate to="/" />

    return <>{children}</>;
};

export default AuthProtected;
