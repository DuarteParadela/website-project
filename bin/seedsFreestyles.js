require("dotenv").config();
require("../config/mongo");

const FreestyleModel = require("../models/Freestyle");

const freestyles = [
  {
    nickname: "The Kid LAROI",
    title: "Let Her Go",
    description: "Australian rapper, singer, and songwriter",
    social: "http://instagram.com/thekidlaroi",
    style: "rap",
    url: "https://www.youtube.com/embed/9fteLHb24A4",
    image:
      "https://res.cloudinary.com/anojan/image/upload/v1608256763/The_Kid_Laroi_vv8cja.jpg",
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
