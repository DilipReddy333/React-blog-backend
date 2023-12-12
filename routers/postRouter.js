const express = require("express");
const {
  getAllPosts,
  editPost,
  deletePost,
} = require("../controllers/postController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const path = require("path");

const postRouter = express.Router();

// postRouter.use(AuthMiddleware);
postRouter.get("/all-posts", getAllPosts);
postRouter.put("/edit-post/:id", editPost);
postRouter.delete("/delete-post/:id", deletePost);

module.exports = {
  postRouter,
};
