const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    minLength: 2,
    trim: true
  },
  author: { 
    type: String, 
    required: true, 
    minLength: 2,
    trim: true
  },
  date: { 
    type: Number, 
    required: true,
    min: 1000,
    max: new Date().getFullYear()
  },
  isbn: { 
    type: String, 
    required: true, 
    unique: true
  },
  genre: { 
    type: String, 
    required: true,
    trim: true
  },
  totalCopies: { 
    type: Number, 
    required: true, 
    min: 1
  },
  availableCopies: { 
    type: Number, 
    required: true, 
    min: 0,
    validate: {
      validator: function(value) {
        return value <= this.totalCopies;
      },
      message: 'Available copies cannot exceed total copies'
    }
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;