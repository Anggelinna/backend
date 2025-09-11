const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  userName: { type: String, required: true, unique: true, minLength: 5 },
  surname: { type: String, required: true, minLength: 2 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;