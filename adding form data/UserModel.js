const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const User = mongoose.model("mycollection", nameSchema, "mycollection");

module.exports = User;


