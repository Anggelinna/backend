const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");

const app = express();
app.use(bodyParser.json());
app.use(logger);
app.use(cors);

const {
  API_URL = "http://127.0.0.1",
  PORT = "3005",
  MONGO_URL = "mongodb://localhost:27017/backend",
} = dotenv.config().parsed;

mongoose.connect(MONGO_URL);

app.use(userRoutes);
app.use(bookRoutes);

app.listen(3005, () => {
  console.log(`Сервер запущен на ${API_URL}:${PORT}`);
});

//server.listen(3000, () => {
//  console.log("   • http://localhost:3000");
//  console.log("   • http://localhost:3000?users");
//  console.log("   • http://localhost:3000?hello=YourName");
//});