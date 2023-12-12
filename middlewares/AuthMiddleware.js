const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const AuthMiddleware = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      const { userId } = jwt.verify(token, "Dilip@321");
      // console.log("user ID ", userId);
      req.loggedUser = await userModel.findOne({ _id: userId });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = AuthMiddleware;
