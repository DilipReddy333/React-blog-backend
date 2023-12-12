const express = require("express");

const multer = require("multer");
const uploadMiddlware = multer({ dest: "uploads/" });
const {
  register,
  login,
  createPost,
} = require("../controllers/userController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
// userRouter.use(AuthMiddleware);
userRouter.post(
  "/createpost",
  uploadMiddlware.single("coverImage"),
  createPost
);

module.exports = userRouter;
