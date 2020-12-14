const express = require("express");
const router = new express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });

  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;
      req.flash("success", "Successfully logged in...");
      res.redirect("/");
    }
  }
});

router.get("/logout", async (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/signin");
  });
});

module.exports = router;
