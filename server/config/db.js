const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () => {
  try {
    const connectionParams = {
      // user: process.env.MONGO_USERNAME,
      // pass: process.env.MONGO_PASSWORD,
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(
      'mongodb+srv://tharinduimalka915:4X5cctWukYFIz9qT@cluster0.cipfkdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      connectionParams
    );
    console.log('Connected to database.');
  } catch (error) {
    console.log('Could not connect to database.', error);
  }
};

module.exports = connectDB;
