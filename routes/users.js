const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const FreestyleModel = require("./../models/Freestyle");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

router.get("/profile", async function (req, res, next) {
  try {
    const users = await UserModel.findById(
      req.session.currentUser._id
    ).populate("freestyles");
    console.log(users);
    res.render("profile", { users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
