require("dotenv").config();
require("../config/mongo");

const DataModel = require("../models/Data");

const data = [
  {
    title: "Kidaki - Une balle qui tue ?",
    description: "yungpepito@pepito.com",
    social: " Instagram @Yungpepito",
    style: "drill",
  },
];

DataModel.deleteMany()
  .then(async () => {
    await DataModel.insertMany(data);
  })
  .catch((err) => {
    console.error(err);
  });
