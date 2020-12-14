let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FreestyleSchema = new Schema({
  title: String,
  description: String,
  social: String,
  style: String,
  url: String,
  likes: [récupérer Id du User : A récup sur artistify],
  dislikes: Number,
  date: Date,
});

const FreestyleModel = mongoose.model("freestyle", FreestyleSchema);
module.exports = FreestyleModel;
