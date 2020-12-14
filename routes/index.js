var express = require("express");
var router = express.Router();
const PostModel = require("./../models/Post");
// const DataModel = require("./../models/Data");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "New Talents" });
});

router.get("/dashboard", function (req, res) {
  res.render("manageVideos");
});

router.get("/hotfive", function (req, res) {
  res.render("hotFive");
});

router.get("/send-freestyle", function (req, res) {
  res.render("sendFreestyle");
});

// router.post("/send-freestyle", async (req, res, next) => {
//   try {
//     newPost = { ...req.body };
//     await PostModel.create(newPost);
//     res.redirect("/");
//   } catch (err) {
//     next(err);
//   }
// });

router.post(
  "/send-freestyle",
  uploader.single("video"),
  async (req, res, next) => {
    const newPost = { ...req.body };
    if (!req.file) {
      newPost.video = undefined;
    } else {
      newPost.video = req.file.path;
    }
    try {
      await PostModel.create(newPost);
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/publication/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.render("publication", post);
  } catch (err) {
    next(err);
  }
});

router.get("/edit-freestyle/:id", async function (req, res, next) {
  try {
    const post = await PostModel.findById(req.params.id);
    res.render("editFreestyle", post);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/edit-freestyle/:id",
  uploader.single("video"),
  async (req, res, next) => {
    const editPost = { ...req.body };
    if (!req.file) {
      editPost.video = undefined;
    } else {
      editPost.video = req.file.path;
    }
    try {
      await PostModel.findByIdAndUpdate(req.params.id, editPost, { new: true });
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/delete/:id", async function (req, res, next) {
  try {
    await PostModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
