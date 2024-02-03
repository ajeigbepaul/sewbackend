const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profilePic: { type: String },
    documents: { type: String },
    address: { type: String },
    phone: { type: String },
    roles: {
      user: { type: Number, default: 1001 },
      admin: Number,
      staff: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
