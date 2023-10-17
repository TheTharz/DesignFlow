const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    designation: String,
    description: String,
    tagline: String,
    contact: String,
    social: {
      facebook: {
        type: String,
        default: 'https://www.facebook.com/',
      },
      twitter: {
        type: String,
        default: 'https://www.twitter.com/',
      },
      instagram: {
        type: String,
        default: 'https://www.instagram.com/',
      },
      linkedin: {
        type: String,
        default: 'https://www.linkedin.com/',
      },
    },
    profilePicture: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
