import React from 'react'
import Register from '../auth/Register'

const RegisterPage = () => {
  return (
    <div>
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Job Application Tracker
          </h1>
        </div>
      </header>
      <Register />
    </div>
  )
}

export default RegisterPage
