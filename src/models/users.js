const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  userName: { type: String, required: true, unique: true, minLength: 5 },
  surname: { type: String, required: true, minLength: 2 },
  email: { type: String, required: true, unique: true },  // ← добавьте
  phone: { type: String, required: true },  // ← добавьте
  registrationDate: { type: Date, default: Date.now },  // ← добавьте
  borrowedBooks: [{  // ← добавьте
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;