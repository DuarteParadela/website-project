let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default:
      "https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png",
  },
  style: String,
  age: Date,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
