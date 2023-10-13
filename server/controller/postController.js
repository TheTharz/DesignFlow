const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// for creating a new post
const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    //validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const post = await Post.create({
      title,
      description,
      owner: req.userId,
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
module.exports = { createPost, updatePost, deletePost, getAllPost };
