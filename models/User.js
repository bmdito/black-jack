const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  chips: {
    type: Number
  },
  //put this in user model so its always accessible
  avatar: {
    type: String
  },
  date: {
    type: Date,
    defualt: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
