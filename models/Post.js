let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: String,
  description: String,
  social: String,
  style: String,
  url: String,
  likes: Number,
  dislikes: Number,
  date: Date,
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
