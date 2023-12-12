const PostModel = require("../models/postModel");

const getAllPosts = async (req, res) => {
  try {
    // console.log("req.loggedUser ", req.loggedUser);
    const allPosts = await PostModel.find({});
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, post } = req.body;
    const response = await PostModel.findByIdAndUpdate(id, {
      title,
      summary,
      post,
    });
    if (response) {
      res.status(200).json({ "post": "updated" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PostModel.findByIdAndDelete(id);
    if (data) {
      res.status(200).json("Post deleted!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getAllPosts,
  editPost,
  deletePost,
};
