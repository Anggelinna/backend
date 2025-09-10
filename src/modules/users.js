const fs = require("fs");
const path = require("path");

const getUsers = () => {
  return fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf8");
};

module.exports = getUsers;