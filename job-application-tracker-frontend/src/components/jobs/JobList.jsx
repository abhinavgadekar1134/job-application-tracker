import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import Navbar from "../common/Navbar";
// import JobCard from "../components/JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await axios.delete(`${BACKEND_URL}/deleteJob/${id}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });

    // ui refresh only
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BACKEND_URL}/getJobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data.jobs);
      setErrorMsg("");
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMsg("Unauthorized. Please login again.");
      } else {
        setErrorMsg("Failed to load job applications." + err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading jobs...</p>
    );
  }

  if (errorMsg) {
    return (
      <p className="text-center mt-10 text-red-500">{errorMsg}</p>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        My Job Applications
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No job applications added yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default JobList;
