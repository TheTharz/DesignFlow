const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://mongo:27017/designflow');
    console.log(`Mongo DB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to mongo DB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
