const mongoose = require('mongoose')


const aiRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' },
    requestType: String,     // "EMAIL" / "SUMMARY"
    prompt: String,          // input sent to Claude
    response:     {type: mongoose.Schema.Types.Mixed},        // AI output
}, { timestamps: { createdAt: true, updatedAt: false } }); // only createdAt

const AIRequest = mongoose.model('AIRequest', aiRequestSchema);
module.exports = AIRequest