//mongodb connection
const mongoose = require("mongoose");
const config = require("config");
//gets any value in the default json
const db = config.get("mongoURI");

//connect to mogodb
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    //exit process if fails
    process.exit(1);
  }
};

module.exports = connectDB;
