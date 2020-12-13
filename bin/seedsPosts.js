require("dotenv").config();
require("../config/mongo");

const PostModel = require("../models/Post");

const posts = [
  {
    name: "Yung pepito",
    email: "yungpepito@pepito.com",
    avatar: "",
    style: "drill",
    age: 18,
  },
];

PostModel.deleteMany()
  .then(async () => {
    await PostModel.insertMany(posts);
  })
  .catch((err) => {
    console.error(err);
  });
