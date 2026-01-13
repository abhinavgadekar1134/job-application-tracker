const aiRequestmodel = require('../models/aiRequestModel')
const JobApplicationModel = require('../models/jobApplicationModel')
const apiCall = require("./claudeAPiCall") 
//Job Description Summarization and follow up mail generation 


const addreq = async(req,res)=>{
    try{
        const {requestType,applicationId,prompt} = req.body;
    
        const userId = req._id;
        const applicationn = await JobApplicationModel.findOne({_id:applicationId});
  
        const detailes = {
            "companyName":applicationn.companyName,
            "jobTitle":applicationn.jobTitle,
            "jobType":applicationn.jobType,
            "jobLocation":applicationn.jobLocation,
            "jobDescription":applicationn.jobDescription,
            "requestType":requestType,
            "prompt":prompt
        }
        const response = await apiCall.giveResponse(detailes);
        console.log(response);
        
        const mo = new aiRequestmodel({
            userId,applicationId,requestType,prompt,response
        });
        var r = mo.save();
        res.status(200).send({"msg":"save successfull: ","res":response});
    }catch(e)
    {
        console.log("eror: "+e)
        res.status(400).send("error in ai request controller")
    }
}
module.exports = {addreq}