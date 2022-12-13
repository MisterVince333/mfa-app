import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserService from '../services/UserService';


const PrivateRoutes = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoutes