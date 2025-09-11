const mongoose = require("mongoose");
const Book = require("../models/books");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const getBookId = (req) => req.params.book_id || req.query.book_id;

const getBooks = (req, res) => {
  return Book.find({}).then((books) => {
    res.status(200);
    res.send(books);
  });
};

const getBook = (req, res) => {
  const book_id = getBookId(req);
  if (!isValidObjectId(book_id)) {
    res.status(400);
    return res.send({ error: "Invalid book_id" });
  }
  return Book.findById(book_id)
    .then((book) => {
      if (!book) {
        res.status(404);
        return res.send({ error: "Book not found" });
      }
      res.status(200);
      res.send(book);
    })
    .catch((err) => {
      res.status(500);
      res.send({ error: err.message });
    });
};

const createBook = (req, res) => {
  return Book.create({ ...req.body }).then((book) => {
    res.status(201);
    res.send(book);
  });
};

const updateBook = (req, res) => {
  const book_id = getBookId(req);
  if (!isValidObjectId(book_id)) {
    res.status(400);
    return res.send({ error: "Invalid book_id" });
  }
  return Book.findByIdAndUpdate(
    book_id,
    { ...req.body },
    { new: true, runValidators: true }
  )
    .then((book) => {
      if (!book) {
        res.status(404);
        return res.send({ error: "Book not found" });
      }
      res.status(200);
      res.send(book);
    })
    .catch((err) => {
      res.status(500);
      res.send({ error: err.message });
    });
};

const deleteBook = (req, res) => {
  const book_id = getBookId(req);
  if (!isValidObjectId(book_id)) {
    res.status(400);
    return res.send({ error: "Invalid book_id" });
  }
  return Book.findByIdAndDelete(book_id)
    .then((deleted) => {
      if (!deleted) {
        res.status(404);
        return res.send({ error: "Book not found" });
      }
      res.status(204);
      res.send();
    })
    .catch((err) => {
      res.status(500);
      res.send({ error: err.message });
    });
};

const getBooksByUser = (req, res) => {
  const { user_id } = req.params;
  return Book.find({ user_id }).then((books) => {
    res.status(200);
    res.send(books);
  });
};

const addBookToUser = async (req, res) => {
  const { user_id, book_id } = req.params;
  const status = (req.body && req.body.status) || req.query.status;
  const allowedStatuses = ["reading", "completed", "wishlist"];

  if (!isValidObjectId(user_id) || !isValidObjectId(book_id)) {
    res.status(400);
    return res.send({ error: "Invalid user_id or book_id" });
  }

  if (typeof status !== "undefined" && !allowedStatuses.includes(status)) {
    res.status(400);
    return res.send({
      error: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
    });
  }

  try {
    const UserBooks = require("../models/usersBooks");
    const query = { userId: user_id, bookId: book_id };

    if (typeof status !== "undefined") {
      const updated = await UserBooks.findOneAndUpdate(
        query,
        { $set: { status } },
        { new: true, runValidators: true }
      );
      if (updated) {
        res.status(200);
        return res.send(updated);
      }
      const created = await UserBooks.create({ ...query, status });
      res.status(201);
      return res.send(created);
    }

    const existing = await UserBooks.findOne(query);
    if (existing) {
      res.status(200);
      return res.send(existing);
    }
    const created = await UserBooks.create(query);
    res.status(201);
    return res.send(created);
  } catch (err) {
    res.status(500);
    return res.send({ error: err.message });
  }
};

const getBookByUser = (req, res) => {
  const { user_id } = req.params;
  const book_id = getBookId(req);
  if (!isValidObjectId(user_id) || !isValidObjectId(book_id)) {
    res.status(400);
    return res.send({ error: "Invalid user_id or book_id" });
  }
  const UserBooks = require("../models/usersBooks");
  return UserBooks.findOne({ userId: user_id, bookId: book_id })
    .populate("bookId")
    .then((userBook) => {
      if (!userBook) {
        res.status(404);
        return res.send({ error: "Book not found for this user" });
      }
      res.status(200);
      res.send(userBook.bookId);
    })
    .catch((err) => {
      res.status(500);
      res.send({ error: err.message });
    });
};

module.exports.getBookByUser = getBookByUser;
module.exports.getBooks = getBooks;
module.exports.getBook = getBook;
module.exports.createBook = createBook;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;
module.exports.getBooksByUser = getBooksByUser;
module.exports.addBookToUser = addBookToUser;