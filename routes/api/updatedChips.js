const express = require("express");
const router = express.Router();
const config = require("config");
const User = require("../../models/User");
var mongoose = require("mongoose");
// var ObjectId = mongoose.Types.ObjectId;

//@Route	api/updateChips
//@Desc		update chips
//@Access	Public
router.post("/", (req, res) => {
  const { id, finalChips } = req.body;
  console.log(id, finalChips);
  User.findOneAndUpdate({ _id: id }, { chips: finalChips })
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

module.exports = router;
