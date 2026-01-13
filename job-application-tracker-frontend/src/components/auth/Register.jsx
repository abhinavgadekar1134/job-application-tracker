import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [successMsg, setMsg] = useState();
  const [errorMsg, setError] = useState();
  const [passmsg, setPassMsg] = useState();
  const [passCheck, setpassCheck] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    mailId: "",
    password: "",
    dob: "",
    contactNumber: "",
    role: "user",
    enabled: "true"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== passCheck) {
      setPassMsg(true)
      return false
    }
    setPassMsg(false)

    const payload = {
      userName: formData.userName,
      mailId: formData.mailId,
      password: formData.password,
      dob: formData.dob,
      contactNumber: formData.contactNumber
    };

  
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const res = await axios.post(`${VITE_BACKEND_URL}/addUser`, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      setMsg(true);
      setTimeout(() => {
        navigate("/");
      }, 2000); // 10 seconds

    }).catch((err) => {
      setMsg(false)
      setError(true);

    })

  }



  return (
    <>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            User Registration
          </h2>
          {passmsg && <h4 className='bg-green-100 text-green-700 p-2 rounded mb-4'>Please Enter same passwords</h4>}
          {errorMsg && <h4 className='bg-green-100 text-green-700 p-2 rounded mb-4'>Something went wrong</h4>}
          {successMsg && <h4 className='bg-green-100 text-green-700 p-2 rounded mb-4'>Registered Successfully.. Navigating to login page</h4>}
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="mailId"
              value={formData.mailId}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Date of birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Re enter Password
            </label>
            <input
              type="password"
              name="password2"
              value={passCheck}
              onChange={(e) => setpassCheck(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" 
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </>
  )
};

export default Register
