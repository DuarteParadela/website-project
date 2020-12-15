const express = require("express");
const router = express.Router();
const FreestyleModel = require("./../models/Freestyle");
//const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "New Talents" });
});

router.get("/dashboard", async (req, res) => {
  try {
    const freestyles = await FreestyleModel.find();
    res.render("manageVideos", { freestyles });
  } catch (err) {
    next(err);
  }
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
  // uploader.single("video"),
  async (req, res, next) => {
    const newFreestyle = { ...req.body };
    console.log("newFreestyle");
    // if (!req.file) {
    //   newFreestyle.video = undefined;
    // } else {
    //   newFreestyle.video = req.file.path;
    // }
    try {
      await FreestyleModel.create(newFreestyle);
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/freestyle/:id", async (req, res) => {
  try {
    const onefreestyle = await FreestyleModel.findById(req.params.id);
    res.render("publication", onefreestyle);
  } catch (err) {
    next(err);
  }
});

router.get("/edit-freestyle/:id", async function (req, res, next) {
  try {
    const freestyle = await FreestyleModel.findById(req.params.id);
    res.render("editFreestyle", freestyle);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/edit-freestyle/:id",
  // uploader.single("video"),
  async (req, res, next) => {
    const editFreestyle = { ...req.body };
    // if (!req.file) {
    //   editFreestyle.video = undefined;
    // } else {
    //   editFreestyle.video = req.file.path;
    // }
    try {
      await FreestyleModel.findByIdAndUpdate(req.params.id, editFreestyle, {
        new: true,
      });
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/delete/:id", async function (req, res, next) {
  try {
    await FreestyleModel.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
