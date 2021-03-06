var express = require("express");
var router = express.Router();
const FreestyleModel = require("./../models/Freestyle");
const UserModel = require("./../models/User");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const { array } = require("./../config/cloudinary");

/* GET home page. */
router.get("/", async function (req, res) {
  const freestyles = await FreestyleModel.find().sort({ createdAt: -1 });
  const highlighted = await FreestyleModel.find({ style: "Drill" });
  res.render("index", { freestyles, highlighted });
});

router.get("/dashboard", protectPrivateRoute, async function (req, res) {
  const users = await UserModel.findById(req.session.currentUser._id).populate(
    "freestyles"
  );
  const freestyles = users.freestyles;
  console.log(users);
  console.log(freestyles);

  res.render("manageVideos", { freestyles });
});

router.get("/send-freestyle", protectPrivateRoute, function (req, res) {
  res.render("sendFreestyle");
});

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
      const createFreestyle = await FreestyleModel.create(newFreestyle);
      await UserModel.findByIdAndUpdate(req.session.currentUser._id, {
        $push: { freestyles: createFreestyle._id },
      });
      res.redirect("/");
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

router.get(
  "/edit-freestyle/:id",
  protectPrivateRoute,
  async function (req, res, next) {
    try {
      const freestyle = await FreestyleModel.findById(req.params.id);
      res.render("editFreestyle", freestyle);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/edit-freestyle/:id",
  protectPrivateRoute,
  uploader.single("image"),
  async (req, res, next) => {
    const editFreestyle = { ...req.body };
    if (!req.file) {
      editFreestyle.image = undefined;
    } else {
      editFreestyle.image = req.file.path;
    }
    try {
      const updatedF = await FreestyleModel.findByIdAndUpdate(
        req.params.id,
        editFreestyle,
        {
          new: true,
        }
      );
      res.redirect("/dashboard");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/delete/:id", protectPrivateRoute, async function (req, res, next) {
  try {
    const userUpdate = await UserModel.findByIdAndUpdate(
      req.session.currentUser._id,
      { $pull: { freestyles: req.params.id } }
    );
    const freestyleUpdate = await FreestyleModel.findByIdAndRemove(
      req.params.id
    );
    req.session.currentUser.role === "admin"
      ? res.redirect("/dashboardAll")
      : res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/freestyles/:id", protectPrivateRoute, async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const action = req.query.action;

  const foundFreeStyle = await FreestyleModel.findById(req.params.id);
  const hasLiked = foundFreeStyle.likes.includes(userId);
  const hasDisliked = foundFreeStyle.dislikes.includes(userId);

  if (hasLiked && action === "dislikes") {
    return res.redirect("/");
  }

  if (hasDisliked && action === "likes") {
    return res.redirect("/");
  }

  const arrayAction =
    (hasLiked && action === "likes") || (hasDisliked && action === "dislikes")
      ? "$pull"
      : "$addToSet";

  FreestyleModel.findByIdAndUpdate(
    req.params.id,
    {
      [arrayAction]: { [action]: userId },
    },
    { new: true }
  ).then((yo) => {
    res.redirect("/");
  });
  //const action = req.body.action;
  const counter = action === "Like" ? 1 : -1;
});

module.exports = router;
