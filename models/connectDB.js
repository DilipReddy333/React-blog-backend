const mongoose = require("mongoose");
const password = "IE3YwlaFlZAsv1MX";
const connectDB = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://forlearningsites:IE3YwlaFlZAsv1MX@notesapp.huiv8a8.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connection to the DB was Successful!");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
