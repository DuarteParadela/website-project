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
    image:
      "https://res.cloudinary.com/anojan/image/upload/v1607635448/adidas_nqws23.jpg",
    likes: [],
    dislikes: [],
  },
];

FreestyleModel.deleteMany()
  .then(async () => {
    await FreestyleModel.insertMany(freestyles);
  })
  .catch((err) => {
    console.error(err);
  });
