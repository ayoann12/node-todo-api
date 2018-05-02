const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// For using Mongo db on local env or mLab db on remote like Heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp");

module.exports = {mongoose};