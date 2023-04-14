const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    default: "User"
  },
  message: String,
  likes: {
    type: [String], 
    default: []
  }
});