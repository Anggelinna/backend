const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2 },
  author: { type: String, required: true, minLength: 2 },
  date: { type: Number, required: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;