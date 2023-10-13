const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    if (!req.cookies) {
      return res.status(401).json({ message: 'You are not logged in' });
    }
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { _id } = decodedToken;

    req.userId = await User.findById(_id);
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = auth;
