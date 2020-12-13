require("dotenv").config();
require("../config/mongo");

const PostModel = require("../models/Post");

const posts = [
  {
    title: "Kidaki - Une balle qui tue ?",
    description: "yungpepito@pepito.com",
    social: " Instagram @Yungpepito",
    style: "drill",
    url:
      "https://res.cloudinary.com/anojan/video/upload/v1607876542/rap%20videos/Kidaki_-_Une_balle_qui_tue_usrh2s.ts",
    likes: 5,
    dislikes: 1,
    date: 13 / 12 / 2020,
  },
];

PostModel.deleteMany()
  .then(async () => {
    await PostModel.insertMany(posts);
  })
  .catch((err) => {
    console.error(err);
  });
