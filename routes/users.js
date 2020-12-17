const express = require("express");
const router = express.Router();
//const FreestyleModel = require("./../models/Freestyle");
const UserModel = require("./../models/User");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

router.get("/profile", async function (req, res, next) {
  const users = await UserModel.findById(req.session.currentUser._id);
  console.log(req.session.currentUser);
  res.render("profile", { users });
});
//ajouter champ

module.exports = router;
