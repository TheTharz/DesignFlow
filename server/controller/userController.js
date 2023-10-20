const User = require('../models/User');
const Post = require('../models/Post');
const {
  hashPassword,
  createToken,
  comparePassword,
} = require('../helpers/authHelper');
const validator = require('validator');
const jwt = require('jsonwebtoken');
//testing purpose
const authUser = (req, res) => {
  //i have to check is this authorization or not for now this is just a test
  res.json({ message: 'success' });
};

// for login users to the system
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id);

    //sending the cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    res
      .status(200)
      .json({ message: 'User logged in successfully', token, email, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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

  //validation
  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: 'Please enter a strong password' });
  }

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

    res
      .status(201)
      .json({ message: 'User created successfully', savedUser: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  // tested and working fine still have to add profile picture and projects
};

// for updating the user profile
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// for getting the users data
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// for deleting an existing user
const deleteUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    //this is last updated point
    await Post.deleteMany({ owner: id });

    if (!user) {
      return res.status(400).json({ message: 'User does not exists' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// for logging out the user
const logOutUser = (req, res) => {
  const jwtCookie = req.cookies.jwt;
  if (!jwtCookie) {
    return res.status(400).json({ message: 'User is not logged in' });
  }
  res.cookie('jwt', '', { maxAge: 0 });
  res.status(200).json({ message: 'User logged out successfully' });
};

// for getting the profile of the logged in user
const getProfile = async (req, res) => {
  const jwtCookie = req.cookies.jwt;
  if (!jwtCookie) {
    return res.json(null);
  }

  const decoded = jwt.verify(jwtCookie, process.env.SECRET);
  const { _id } = decoded;
  const user = await User.findById(_id);
  if (!user) {
    return res.json(null);
  }
  res.status(200).json({ message: 'User fetched successfully', user });
};

module.exports = {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  deleteUserProfile,
  logOutUser,
  loginUser,
  getProfile,
};
