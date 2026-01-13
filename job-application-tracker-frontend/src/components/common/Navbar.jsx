import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Navbar = () => {
    const navigate = useNavigate();
     const [menuOpen, setMenuOpen] = useState(false);
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem('token');
    const handleLogout= ()=>{
        
        localStorage.removeItem("token");
        localStorage.removeItem("userName")
        navigate('/');
    }
    return (
        <>
        
       <nav className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          JobTracker<span className="text-gray-700">AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/showJobs" className="hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/addJob" className="hover:text-blue-600">
            Add Job
          </Link>
          <Link to="/statsShow" className="hover:text-blue-600">
            Analytics
          </Link>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm text-gray-500">
            👋 Hi, {userName}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm font-medium text-gray-600">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/showJobs" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>
          <Link to="/addJob" onClick={() => setMenuOpen(false)}>
            Add Job
          </Link>
          <Link to="/statsShow" onClick={() => setMenuOpen(false)}>
            Analytics
          </Link>

          <div className="border-t pt-4">
            <span className="block text-gray-500 mb-2">
              👋 Hi, {userName}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
    </>
    );
};


export default Navbar


