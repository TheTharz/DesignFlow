const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () => {
  try {
    // Use environment variables for MongoDB connection
    const username = process.env.MONGO_INITDB_ROOT_USERNAME;
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
    const dbUrl = `mongodb://${username}:${password}@mongo:27017/designflow`;

    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
