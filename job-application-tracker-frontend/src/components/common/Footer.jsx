import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 text-black text-center flex items-center justify-center">
        <p className="text-s">
          © {new Date().getFullYear()} Job Application Tracker. All rights reserved.
        </p>
      </footer>

    </div>
  )
}

export default Footer
