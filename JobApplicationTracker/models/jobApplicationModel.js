const mongoose = require('mongoose')

// Job Application Schema & Model
const jobApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // reference → users
    companyName: String,
    jobTitle: String,
    jobType: String,     // Full-time / Internship / Contract
    jobLocation: String,
    status: String,      // Applied / Interview / Rejected / Offer
    appliedDate: Date,
    jobDescription: String,   // raw JD text
    jobSummary: String,       // AI-generated summary
    notes: String,            // user notes
}, { timestamps: true });     // automatically adds createdAt & updatedAt

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
module.exports = JobApplication