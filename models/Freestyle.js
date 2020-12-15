const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FreestyleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    social: String,
    style: String,
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Dislike" }],
  },
  {
    timestamps: true,
  }
);

const FreestyleModel = mongoose.model("freestyle", FreestyleSchema);
module.exports = FreestyleModel;
