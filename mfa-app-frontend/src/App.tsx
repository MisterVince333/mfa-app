import React, { useEffect, useState, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <>
      <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home/>} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>      
    </>
  );
}

export default App;
