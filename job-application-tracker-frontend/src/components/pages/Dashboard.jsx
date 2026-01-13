import React, { useEffect } from 'react'
import AddJob from '../jobs/AddJob'
import JobCard from '../jobs/JobCard'
import JobDetails from '../jobs/JobDetails'
import JobList from '../jobs/JobList'
import Cards from '../stats/Cards'
import Navbar from '../common/Navbar'
const Dashboard = () => {
  const token = localStorage.getItem("token");;


  return (
    <>
      <Navbar />
      <Cards />
    </>
  )
}

export default Dashboard
