var express = require("express");
var router = express.Router();
const FreestyleModel = require("./../models/Freestyle");
const UserModel = require("./../models/User");
// const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
// const { array } = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

router.get("/dashboardAll", protectAdminRoute, async function (req, res) {
  const freestyles = await FreestyleModel.find();
  res.render("allVideos", { freestyles });
});

module.exports = router;
