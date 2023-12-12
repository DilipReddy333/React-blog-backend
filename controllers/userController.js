const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PostModel = require("../models/postModel");

const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const { username, password } = req.body;
    const alreadyUser = await userModel.findOne({ username: username });
    if (alreadyUser) {
      throw new Error("Username already exists");
    }
    const user = await userModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    if (user) {
      // create jwt token to log the user in after registration
      const token = jwt.sign(
        { user: user.username, userId: user._id },
        "Dilip@321"
      );
      res.status(200).json({ user, token: token });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  try {
    const user = await userModel.findOne({ username });
    // console.log(userDoc);
    if (user) {
      const validUser = bcrypt.compareSync(password, user.password);
      if (validUser) {
        // console.log(validUser);
        // create jwt token
        const token = jwt.sign(
          { user: user.username, userId: user._id },
          "Dilip@321"
        );
        // console.log(token);
        return res.status(200).json({ user, token: token });
      } else {
        throw Error("wrong password");
      }
    } else {
      throw new Error("wrong username");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// router to create post
const createPost = async (req, res) => {
  const { originalname, path } = req.file;

  // renaming the file as the file will be in binary format
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  // storing the whole post content to the database
  try {
    // console.log(req.loggedUser);
    const { title, summary, post, authorName, authorId } = req.body;
    const newPost = await PostModel.create({
      title,
      summary,
      post,
      coverImage: newPath,
      authorId,
      authorName,
    });
    if (newPost) {
      res.status(200).json(newPost);
    } else {
      throw new Error("could not create post");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  createPost,
};
