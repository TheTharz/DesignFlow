const mongoose = require('mongoose');
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    postImage: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
