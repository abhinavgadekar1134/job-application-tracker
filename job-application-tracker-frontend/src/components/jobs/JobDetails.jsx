import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FollowupGenerator from "../ai/FollowupGenerator";
import JobSummary from "../ai/JobSummary";
import axios from "axios";
import Navbar from "../common/Navbar";

const JobDetails = () => {
  const { id } = useParams(); // 👈 get job ID from URL
  const [job, setJob] = useState(null);
  const [aiSummary, setaiSummary] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BACKEND_URL}/getJob/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((e) => console.log(e));

      setJob(res.data);
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (<>
  <Navbar/>
  <br /><br />
  <center><h1 className="text-3xl font-bold text-gray-500">Job Details </h1></center>
  <br />
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {job.jobTitle}
        </h1>
        <p className="text-gray-600 text-lg">
          {job.companyName}
        </p>
      </div>

      {/* Job Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

        <div>
          <span className="font-semibold text-gray-700">Job Type:</span>
          <p>{job.jobType}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-700">📍 Location:</span>
          <p>{job.jobLocation}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-700">Status:</span>
          <p className="font-medium">{job.status}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-700">📅 Applied Date:</span>
          <p>
            {new Date(job.appliedDate).toLocaleDateString()}
          </p>
        </div>

      </div>

      {/* Description */}
      <div className="mt-6">
        <h2 className="font-semibold text-gray-700 mb-1">
          🧾 Job Description
        </h2>
        <p className="text-gray-600">
          {job.jobDescription}
        </p>
      </div>

      {/* Notes */}
      {job.notes && (
        <div className="mt-6">
          <h2 className="font-semibold text-gray-700 mb-1">
            📝 Notes
          </h2>
          <p className="text-gray-600">
            {job.notes}
          </p>
        </div>
      )}
      <br />
      {/* 
      <textarea
        
        placeholder="Give prompt for ai suggestion"
        readOnly
        className="w-full p-3 border rounded"
      /> */}

      <br /><br />
      <button
        onClick={() => navigate(`/followUP/${job._id}`)}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
      >
        Generate Follow Up Mail
      </button>
      
      <button
        onClick={()=>setaiSummary(true)}
        className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition"
      >
       ✨ Generate AI Summary
      </button>
      {aiSummary && <JobSummary jobid={job._id} onClose={() => setaiSummary(false)} />}
    </div>


  </>
  );
};

export default JobDetails;
