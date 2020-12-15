require("dotenv").config();
require("../config/mongo");

const UserModel = require("../models/User");

const users = [
  {
    name: "Yung pepito",
    email: "yungpepito@pepito.com",
    avatar: "",
    style: "drill",
    age: `1993-12-06`,
  },
];

UserModel.deleteMany()
  .then(async () => {
    await UserModel.insertMany(users);
  })
  .catch((err) => {
    console.error(err);
  });
