const Job = require("../models/jobApplicationModel");
const mongoose = require('mongoose')
const getDashboardStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Job.aggregate([
      { $match: { userId:userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert aggregation result to readable object
    const response = {
      total: 0,
      applied: 0,
      interview: 0,
      rejected: 0,
      offer: 0
    };

    stats.forEach((item) => {
      response.total += item.count;

      if (item._id === "Applied") response.applied = item.count;
      if (item._id === "Interview") response.interview = item.count;
      if (item._id === "Rejected") response.rejected = item.count;
      if (item._id === "Offer") response.offer = item.count;
    });
    console.log(userId);
    res.status(200).json(response);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Dashboard stats error" ,"error":error});
  }
};

module.exports = { getDashboardStats };
