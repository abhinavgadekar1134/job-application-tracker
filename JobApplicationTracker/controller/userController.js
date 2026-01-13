const mongoose = require('mongoose')
const usermodel = require('../models/userModel')
mongoose.pluralize(null);
const bcrypt = require('bcryptjs');


const findUsersController = async (req, res) => {
    try {
        const data = await usermodel.find();
        res.status(200).send("showing you data: " + data);
    } catch (e) {
        res.status(400).send("Cant show data");
    }

}
const findUserByEmail = async (req, res) => {
    try {
        const {mailId} = req.params;
        const data = await usermodel.findOne({ "mailId": mailId });
        res.status(200).send("showing you data: " + data);
    } catch (e) {
        res.status(400).send("Cant show data"+e);
    }
}
const deleteUser = async (req, res) => {
    try {
        const {mailId} = req.params;
        const acknowledge = await usermodel.deleteOne({ mailId });

        if (acknowledge.acknowledged === true) {
            res.status(200).send("User deleted");
        }
        else {
            console.log(acknowledge)
            res.status(400).send("Cant delete");
        }
    } catch (e) {
        res.status(400).send("Server error while deleting"+e);
    }

}
const updateUser = async(req,res)=>{
    try {
        const {mailId} = req.params;

        const {password,role,enabled} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const acknowledge = await usermodel.updateOne({mailId},{$set:{"password":hashedPassword,"role":role,"enabled":enabled}});
        if (acknowledge.acknowledged === true) {
            res.status(200).send("User update");
        }
        else {
            res.status(400).send("Cant update");
        }
    } catch (e) {
        res.status(400).send("Server error while deleting");
    }
}
const addUser = async(req,res)=>{
    try{
        const {dob,contactNumber,mailId,userName,password,role,enabled} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userObj = new usermodel({
            dob,contactNumber,mailId,userName,password:hashedPassword,role,enabled
        });
        var s = await userObj.save();
        res.status(200).send("User added");
    }catch(e){
        console.log(e);
        res.status(400).send("server error");
    }
}

module.exports = { findUsersController,findUserByEmail,deleteUser,updateUser,addUser }
