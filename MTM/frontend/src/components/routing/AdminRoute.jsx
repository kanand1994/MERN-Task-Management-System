import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
