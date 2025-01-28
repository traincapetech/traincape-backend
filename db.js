const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.MongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// const connection = mongoose.connect("mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6")

module.exports = {  
  connection,
};
console.log("MongoDB URI:", process.env.MongoDBURI);