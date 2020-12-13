var express = require("express");
var router = express.Router();
const PostModel = require("./../models/Post");
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

router.post(
  "/send-freestyle",
  protectPrivateRoute,
  uploader.single("video"),
  async (req, res, next) => {
    const newPost = { ...req.body };
    if (!req.file) {
      newPost.image = undefined;
    } else {
      newPost.image = req.file.path;
    }
    try {
      await PostModel.create(newPost);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/publication/:id", protectPrivateRoute, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.render("publication", post);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/edit-freestyle/:id",
  protectPrivateRoute,
  async function (req, res, next) {
    try {
      const post = await PostModel.findById(req.params.id);
      console.log(req.params.id);
      res.render("editFreestyle", post);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/edit-freestyle/:id",
  protectPrivateRoute,
  async function (req, res, next) {
    try {
      await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/delete/:id", protectPrivateRoute, async function (req, res, next) {
  try {
    await PostModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
