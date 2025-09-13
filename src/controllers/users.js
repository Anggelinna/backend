const User = require("../models/users");

const getUsers = (req, res) => {
  return User.find({}).then((users) => {
    res.status(200);
    res.send(users);
  });
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  return User.findById(user_id).then((user) => {
    res.status(200);
    res.send(user);
  });
};

const createUser = (req, res) => {
  return User.create({ ...req.body }).then((user) => {
    res.status(201);
    res.send(user);
  });
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  return User.findByIdAndUpdate(user_id, { ...req.body }, { new: true }).then(
    (user) => {
      res.status(200);
      res.send(user);
    }
  );
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  return User.findByIdAndDelete(user_id).then(() => {
    res.status(204);
    res.send();
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};