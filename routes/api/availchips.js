const express = require("express");
const router = express.Router();

const chipCheck = require("../../models/User");

//@Route	get api/availchips
//@Desc
//@Access	Public
router.get("/", (req, res) => {
  chipCheck.find(req.body).then(count => res.json(count));
});

module.exports = router;
