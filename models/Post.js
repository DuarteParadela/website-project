let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  url: String,
  likes: Number,
  dislikes: Number,
  date: Date,
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
