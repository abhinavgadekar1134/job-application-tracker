const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    userName: String,
    mailId:String,
    password: String,
    userId: Number,
    dob: String,
    contactNumber: Number,
    role: String,
    enabled: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
mongoose.pluralize(null)
const usermodel = mongoose.model('User', userSchema)

module.exports =  usermodel 