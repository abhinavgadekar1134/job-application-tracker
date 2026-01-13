import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
const JobCard = ({ job ,onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";
      case "Interview":
        return "bg-yellow-100 text-yellow-700";
      case "Offer":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  

  return (
    <div className="relative bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition">

      <div className="absolute top-3 right-3 flex gap-3">
        <button
          onClick={() => navigate(`/updatejob/${job._id}`)}
          className="text-gray-500 hover:text-blue-600"
          title="Update Job"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(job._id)}
          className="text-gray-500 hover:text-red-600"
          title="Delete Job"
        >
          <Trash2 size={18} />
        </button>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">
        {job.jobTitle}
      </h3>

      <p className="text-gray-600 mt-1">{job.companyName}</p>


      <p className="text-sm text-gray-500">{job.jobLocation}</p>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
          job.status
        )}`}
      >
        {job.status}
      </span>


      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate(`/jobs/${job._id}`)}
          className="text-blue-600 hover:underline text-sm"
        >
          View Details
        </button>

        <button
          className="text-purple-600 hover:underline text-sm"
          onClick={() => navigate(`/followUP/${job._id}`)}
        >
          Generate Follow Up Mail
        </button>
      </div>
    </div>
  );
};

export default JobCard;
