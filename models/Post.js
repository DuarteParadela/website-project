let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: String,
  description: String,
  social: String,
  style: String,
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
