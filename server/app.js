const express = require('express');
const connectDB = require('./config/db.js');

const app = express();

//database
connectDB();
//middlewares

//routes

module.exports = app;
//has to implement

//API ENDPOINTS ARE NOT UPDATED
