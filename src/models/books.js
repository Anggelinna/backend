const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2 },
  author: { type: String, required: true, minLength: 2 },
  date: { type: Number, required: true },
  isbn: { type: String, required: true, unique: true },  // ← добавьте
  genre: { type: String, required: true },  // ← добавьте
  totalCopies: { type: Number, required: true, min: 1 },  // ← добавьте
  availableCopies: { type: Number, required: true, min: 0 }  // ← добавьте
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;