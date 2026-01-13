const express = require('express')
const controller = require('./controller/userController')
const jobcontroller = require('./controller/jobController')
const authController = require('./controller/authController')
const authMiddleware = require('./middleware/auth')
const aiRequestControoler = require('./controller/aiRequestController')
const dashboardStatController = require('./controller/dashboardStatController')
const route = express.Router()



route.get('/getUsers', authMiddleware, controller.findUsersController)
route.get('/getUser/:mailId', authMiddleware, controller.findUserByEmail)
route.delete('/deleteUser/:mailId', authMiddleware, controller.deleteUser)
route.post('/addUser',  controller.addUser)
route.put('/updateUser/:mailId', authMiddleware, controller.updateUser)

route.post('/login', authController.login)


route.post('/addJob', authMiddleware, jobcontroller.addJob);
route.get('/getJobs', authMiddleware, jobcontroller.getAllJobs);
route.get('/getJob/:id', authMiddleware, jobcontroller.getJob);
route.put('/updateJob/:id',    authMiddleware,    jobcontroller.updateJob);
route.delete(    '/deleteJob/:id',    authMiddleware,    jobcontroller.deleteJob);

route.get('/getDashboardStat', authMiddleware, dashboardStatController.getDashboardStats);

route.post("/submitAiReq",authMiddleware,aiRequestControoler.addreq)
module.exports = { route }