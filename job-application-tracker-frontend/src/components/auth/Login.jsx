import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Login = () => {
    const [count, setCount] = useState(0)
    const [userName, setemail] = useState("");
    const [mailId, setmailId] = useState("");
    const [password, setpassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = { mailId: mailId, password: password }
        axios.post(`${BACKEND_URL}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setErrorMsg("");

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userName", res.data.userName)
            navigate('/dashboard');

        }).catch(err => {
            console.log(err.status == 401);
            if (err.status == 401) {


                setErrorMsg("Invalid username or password");


                console.error(err);

            } else {
                setErrorMsg("Something went wrong. Please try again." + err);
                console.log(err)
            }
        })
    }
    return (
        <>
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="username"
                                    required
                                    autoComplete="email"
                                    onChange={(e) => setmailId(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={(e) => setpassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        {errorMsg && (
                            <p style={{ color: "red", marginBottom: "10px" }}>
                                {errorMsg}
                            </p>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                            >

                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not Registered?{' '}
                        <button onClick={() => navigate('/registerUser')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Register Here
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
