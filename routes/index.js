<<<<<<< HEAD
var express = require("express");
var router = express.Router();
const VideoModel = require("./../models/Post");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");


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
