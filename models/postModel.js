const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    summary: { type: String },
    post: { type: String },
    coverImage: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId },
    authorName: { type: String },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
