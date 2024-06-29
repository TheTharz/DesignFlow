const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// for hashing the password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

// for creating the json web token
const createToken = (_id) => {
  return jwt.sign({ _id }, 'asdfghjklopiumnbytvcrxezwq', {
    expiresIn: '1h',
  });
};

// for matching the password
const comparePassword = async (password, hashPassword) => {
  try {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};
module.exports = { hashPassword, createToken, comparePassword };
//this code is completed
