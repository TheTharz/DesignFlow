const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
  logOutUser,
} = require('../controller/userController.js');

// http://localhost:3000/api/users/auth
router.route('/auth').post(authUser);

// http://localhost:3000/api/users
router.route('/').post(registerUser);

module.exports = router;
