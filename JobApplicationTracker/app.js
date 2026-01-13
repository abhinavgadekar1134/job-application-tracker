const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
const cor = cors();
const app = express();
app.use(express.json());
require("dotenv").config();


const mongoosee = mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)

app.use(cor)
app.use("/abc",routes.route)

app.listen(8000,()=>console.log("Server running on 8000"))
