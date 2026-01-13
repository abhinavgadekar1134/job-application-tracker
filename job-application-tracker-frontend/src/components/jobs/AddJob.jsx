import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const AddJob = () => {

const [title,settitle] = useState('');
const [company,setcompany] = useState('');
const [jobType,setjobType] = useState('Full Time');
const [location,setlocation] = useState('');
const [description,setdescription] = useState('');
const [status,setstatus] = useState('Applied');
const [notes,setnotes] = useState('');
    const setData = {
        jobTitle:title,
        companyName:company,
        jobDescription:description,
        jobLocation:location,
        status:status,
        jobType:jobType,
        notes:notes
    }

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
  
    setErrorMsg(""); // clear error on typing
    setSuccessMsg(""); // clear success on typing
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await axios.post(`${BACKEND_URL}/addJob`, setData,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // <--- JWT Bearer token
          },
        });
      setSuccessMsg("Job added successfully!");
      setErrorMsg("");
      
    } catch (err) {
      if (err.response) {
        setErrorMsg(err.response.data.message || "Something went wrong!");
      } else {
        console.log(err)
        setErrorMsg("Server error. Try again later."+err);
      }
      setSuccessMsg("");
    }

    setLoading(false);
  };
    return (
        <>
         
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Job</h2>

      {errorMsg && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{errorMsg}</p>
      )}
      

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e)=>setcompany(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e)=>setlocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Job Type</label>
          <select
            name="type"
            value={jobType}
            onChange={(e)=>setjobType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Full Time">Full time</option>
            <option value="PartTime">Part time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Notes</label>
          <input
            type="text"
            name="notes"
            value={notes}
            onChange={(e)=>setnotes(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Job Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e)=>setstatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        {successMsg && (
        <p className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {successMsg}
        </p>
      )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
        </>
    )
}

export default AddJob
