var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  title: String,
  description: String,
  url: String,
  duration: String,
  likes: Number,
  dislikes: Number,
  date: Date,
});

const VideoModel = mongoose.model("video", VideoSchema);

module.exports = VideoModel;
