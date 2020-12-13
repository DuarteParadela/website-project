var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "New Talent" });
});

router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

router.get("/hotfive", function (req, res, next) {
  res.render("hotFive");
});

router.get("/send-freestyle", function (req, res, next) {
  res.render("sendFreestyle");
});

module.exports = router;
