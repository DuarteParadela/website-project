let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  // avatar: {
  //   type: String,
  //   default:
  //     "https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png",
  // }
  freestyles: [{ type: Schema.Types.ObjectId, ref: "Freestyle" }],
  style: String,
  age: Date,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
