
const JobApplication = require('../models/jobApplicationModel'); // adjust path if needed

// Add Job Application
const addJob = async (req, res) => {
  try {

    const {
      companyName: companyName, jobTitle, jobType, jobLocation, status, appliedDate, jobDescription, notes
    } = req.body;

    // Make sure userId is available from auth middleware (JWT)
    const userId = req.user._id; // assuming req.user is set by auth middleware
    console.log("user id: " + userId)
    if (!companyName || !jobTitle) {
      return res.status(400).json({ message: "Company name and job title are required" });
    }

    // Create new JobApplication
    const newJob = new JobApplication({
      userId,
      companyName,
      jobTitle,
      jobType,
      jobLocation,
      status: status || "Applied", // default to Applied
      appliedDate: appliedDate || new Date(),
      jobDescription,
      notes
    });

    // Save to DB
    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Job application added successfully",
      job: savedJob
    });

  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const userId = req.user._id;

    const jobs = await JobApplication
      .find({ userId })
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;        // jobId
    const userId = req.user._id;


    const job = await JobApplication
      .findOne({ _id: id , userId: userId});
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json(    job   );

  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Update job application
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;        // jobId
    const userId = req.user._id;

    const updatedJob = await JobApplication.findOneAndUpdate(
      { _id: id, userId },             // ownership check
      req.body,                        // fields to update
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob
    });

  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete job application
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;   // jobId
    const userId = req.user._id;

    const deletedJob = await JobApplication.findOneAndDelete({
      _id: id,
      userId
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { addJob, deleteJob, updateJob, getAllJobs, getJob };
