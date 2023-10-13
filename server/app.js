const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const app = express();

//database
connectDB();
//middlewares
app.use(express.json());
//routes
app.use('/api/users', userRoutes);

module.exports = app;
//has to implement

//API ENDPOINTS ARE NOT UPDATED
