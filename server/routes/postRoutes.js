const express = require('express');
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
} = require('../controller/postController');
const auth = require('../middleware/authMiddleware');

const checkAuth = (req, res, next) => {
  // Check if the route requires authentication
  //console.log('Checking auth for route: ', req.url);
  if (req.url !== '/allposts') {
    // Apply auth middleware for these routes
    return auth(req, res, next);
  }

  // Allow requests to pass without authentication for other routes
  next();
};

//checking the authorization for below all endpoints
router.use(checkAuth);

// http://localhot:3000/api/post
router.route('/').post(createPost);

// http://localhot:3000/api/post/:id
router.route('/:id').put(updatePost);

// http://localhost:3000/api/post/:id
router.route('/:id').delete(deletePost);

// http://localhost:3000/api/post/allposts
router.route('/allposts').get(getAllPost);
module.exports = router;
