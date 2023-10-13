const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
  logOutUser,
  loginUser,
} = require('../controller/userController.js');

// http://localhost:3000/api/users/auth
router.route('/auth').post(authUser);

// http://localhost:3000/api/users/register
router.route('/register').post(registerUser);

// http://localhost:3000/api/users/login
router.route('/login').post(loginUser);

// http://localhost:3000/api/users/:id
router.route('/:id').put(updateUserProfile);

// http://localhost:3000/api/users/:id
router.route('/:id').get(getUserProfile);

// http://localhost:3000/api/users/:id
router.route('/:id').delete(deleteUserProfile);

// http://localhost:3000/api/users/logout
router.route('/logout').post(logOutUser);
module.exports = router;
