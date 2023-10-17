const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// for creating a new post
const createPost = async (req, res) => {
  const { title, description, postImage, category } = req.body;
  try {
    //validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const post = await Post.create({
      title,
      description,
      owner: req.userId,
      postImage,
      category,
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// for updating the post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.userId._id;
    if (!post.owner._id.equals(userId)) {
      return res
        .status(401)
        .json({ message: 'You are not authorized to update this post' });
    }
    await Post.updateOne({ _id: id }, req.body);
    const updatedPost = await Post.findById(id);
    res.status(200).json({ message: 'Post updated successfully', updatedPost });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// for deleting a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userId = req.userId._id;
    if (!post.owner._id.equals(userId)) {
      return res
        .status(401)
        .json({ message: 'You are not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: 'Post deleted successfully', post });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//for get all posts
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({ message: 'No post found' });
    }
    res.status(200).json({ message: 'All Posts', posts });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//get post by particular id of user
const getPostByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.find({ owner: id });
    if (!posts) {
      return res.status(404).json({ message: 'No post found' });
    }
    res.status(200).json({ message: 'All Posts', posts });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//get post by id
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'No post found' });
    }
    res.status(200).json({ message: 'Post', post });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// like the post
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { likes: req.userId },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// unlike the post
const unlikePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $pull: { likes: req.userId },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: 'Post unliked successfully', post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getPostByUserId,
  getPostById,
  likePost,
  unlikePost,
};
