const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  emailId: {
    type: String,
  },
  contactNo: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserModelSchema, "users");
