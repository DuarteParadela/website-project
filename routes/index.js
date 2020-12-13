// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const VideoModel = require("./../models/Video");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Project Two" });
});

module.exports = router;
