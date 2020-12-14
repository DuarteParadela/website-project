require("dotenv").config();
require("../config/mongo");

const FreestyleModel = require("../models/Freestyle");

const freestyles = [
  {
    title: "Claqué au sol",
    description: "String",
    social: "String",
    style: "String",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607876542/rap%20videos/Kidaki_-_Une_balle_qui_tue_usrh2s.ts",
    likes: [],
    dislikes: [],
    date: `2020-12-13`,
  },
];

FreestyleModel.deleteMany()
  .then(async () => {
    await FreestyleModel.insertMany(freestyles);
  })
  .catch((err) => {
    console.error(err);
  });
