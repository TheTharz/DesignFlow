const express = require('express');
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
} = require('../controller/postController');
const auth = require('../middleware/authMiddleware');

//checking the authorization for below all endpoints
router.use(auth);

// http://localhot:3000/api/post
router.route('/').post(createPost);

// http://localhot:3000/api/post/:id
router.route('/:id').put(updatePost);

// http://localhost:3000/api/post/:id
router.route('/:id').delete(deletePost);

// http://localhost:3000/api/post
router.route('/').get(getAllPost);
module.exports = router;
