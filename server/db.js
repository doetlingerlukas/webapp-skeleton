const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const {
  MONGO_HOSTNAME,
  MONGO_DB,
  MONGO_PORT
} = process.env;

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
});