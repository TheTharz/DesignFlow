const User = require('../models/User');
const hashPassword = require('../helpers/authHelper');

//testing purpose
const authUser = (req, res) => {
  //i have to check is this authorization or not for now this is just a test
  res.json({ message: 'success' });
};

//for registering new users to the app
const registerUser = async (req, res) => {
  const {
    userName,
    email,
    password,
    designation,
    description,
    tagline,
    contact,
    social,
  } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      designation,
      description,
      tagline,
      contact,
      social,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  // tested and working fine still have to add profile picture and projects
};

const updateUserProfile = (req, res) => {
  res.json({ message: 'success' });
};
const getUserProfile = (req, res) => {
  res.json({ message: 'success' });
};
const deleteUserProfile = (req, res) => {
  res.json({ message: 'success' });
};
const logOutUser = (req, res) => {
  res.json({ message: 'success' });
};
module.exports = {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  deleteUserProfile,
  logOutUser,
};
