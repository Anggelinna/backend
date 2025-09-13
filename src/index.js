const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const corsMiddleware = require("./middleware/cors"); 

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(logger);
app.use(corsMiddleware); 

const {
  API_URL = "http://127.0.0.1",
  PORT = "3005",
  MONGO_URL = "mongodb://localhost:27017/library",
} = process.env;

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

app.use(userRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${API_URL}:${PORT}`);
});