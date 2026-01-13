import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import LoginPage from './components/pages/LoginPage'
import Dashboard from './components/pages/Dashboard'
import JobList from './components/jobs/JobList'
import JobDetails from './components/jobs/JobDetails'
import FollowupGenerator from './components/ai/FollowupGenerator'
import JobSummary from './components/ai/JobSummary'
import UpdateJob from './components/jobs/UpdateJob'
import Navbar from './components/common/Navbar'
import AddJobsPage from './components/pages/AddJobsPage'
import Chartsshow from './components/stats/Chartsshow'
import StatsPage from './components/pages/StatsPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Register from './components/auth/Register'
import Footer from './components/common/Footer'
import RegisterPage from './components/pages/RegisterPage'


function App() {

  return (
    <>
      {/* <Dashboard/> */}
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<LoginPage />} />

            <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
            <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
            <Route path='/followUP/:id' element={<ProtectedRoute><FollowupGenerator /></ProtectedRoute>} />
            <Route path='/jobSummary/:id' element={<ProtectedRoute><JobSummary /></ProtectedRoute>} />
            <Route path='/updatejob/:id' element={<ProtectedRoute><UpdateJob /></ProtectedRoute>} />
            <Route path='/addJob' element={<ProtectedRoute><AddJobsPage /></ProtectedRoute>} />
            <Route path='/showJobs' element={<ProtectedRoute><JobList /></ProtectedRoute>} />
            <Route path='/statsShow' element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />
            <Route path='/registerUser' element={<RegisterPage />} />
          </Routes>
        </div>


        <Footer />
      </div>
    </>
  )
}

export default App
