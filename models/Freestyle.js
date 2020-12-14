let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FreestyleSchema = new Schema({
  title: String,
  description: String,
  social: String,
  style: String,
  url: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "like" }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: "dislike" }],
  date: Date,
});

const FreestyleModel = mongoose.model("freestyle", FreestyleSchema);
module.exports = FreestyleModel;
