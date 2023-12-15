const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const connectDB = require("./models/connectDB");
const { postRouter } = require("./routers/postRouter");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));
connectDB();
app.use("/api/user", userRouter);
app.use("/api", postRouter);

app.listen(port, () => {
  console.log("server listening on the port " + port);
});
