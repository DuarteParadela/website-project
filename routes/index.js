var express = require("express");
var router = express.Router();
const FreestyleModel = require("./../models/Freestyle");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

/* GET home page. */
router.get("/", async function (req, res) {
  const freestyles = await FreestyleModel.find().sort({ createdAt: -1 });
  res.render("index", { freestyles });
});

router.get("/dashboard", async function (req, res) {
  const freestyles = await FreestyleModel.find().sort({ createdAt: -1 });
  res.render("manageVideos", { freestyles });
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
  uploader.single("image"),
  async (req, res, next) => {
    const newFreestyle = { ...req.body };
    if (!req.file) {
      newFreestyle.image = undefined;
    } else {
      newFreestyle.image = req.file.path;
    }
    try {
      await FreestyleModel.create(newFreestyle);
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/publication/:id", async (req, res) => {
  try {
    const freestyle = await FreestyleModel.findById(req.params.id);
    res.render("publication", freestyle);
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
  uploader.single("image"),
  async (req, res, next) => {
    const editFreestyle = { ...req.body };
    if (!req.file) {
      editFreestyle.image = undefined;
    } else {
      editFreestyle.image = req.file.path;
    }
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

router.post("/publication/:id", (req, res, next) => {
  const action = req.body.action;
  const counter = action === "Like" ? 1 : -1;
  Post.update(
    { _id: req.params.id },
    { $inc: { likes: counter } },
    {},
    (err, numberAffected) => {
      res.send("");
    }
  );
});

module.exports = router;
