const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
//database
connectDB();
//middlewares
app.use(
  cors({
    origin: 'http://design-flow-frontend:80',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  })
);
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.json());
app.use(cookieParser());
//routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
//has to implement

//API ENDPOINTS ARE NOT UPDATED
