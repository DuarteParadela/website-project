let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DataSchema = new Schema({
  title: String,
  description: String,
  social: String,
  style: String,
});

const DataModel = mongoose.model("post", DataSchema);
module.exports = DataModel;
