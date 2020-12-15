require("dotenv").config();
require("../config/mongo");

const FreestyleModel = require("../models/Freestyle");

const freestyles = [
  {
    title: "Let Her Go",
    description: "The Kid LAROI",
    social: "https://www.instagram.com/thekidlaroi/?hl=fr",
    style: "rap",
    url:
      "https://www.youtube.com/watch?v=9fteLHb24A4&ab_channel=LyricalLemonade",
    likes: [],
    dislikes: [],
    date: `2019-12-06`,
  },
];

FreestyleModel.deleteMany()
  .then(async () => {
    await FreestyleModel.insertMany(freestyles);
  })
  .catch((err) => {
    console.error(err);
  });
