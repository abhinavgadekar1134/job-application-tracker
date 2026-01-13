import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Login from '../auth/Login';
const LoginPage = () => {

    return (
        <>
            <header className="w-full bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Job Application Tracker
                    </h1>
                </div>
            </header>
            <Login />
        </>
    )
}

export default LoginPage
