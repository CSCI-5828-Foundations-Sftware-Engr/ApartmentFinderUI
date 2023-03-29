const mongoose = require("mongoose");
// const User = require("../models/user");
const user = mongoose.model("user");

module.exports = (app) => {
  app.post("/register", (req, res) => {
    try {
      const userPosted = new user({
        name: req.body.name,
        password: req.body.password,
        userName: req.body.userName,
        emailId: req.body.emailId,
        contactNo: req.body.contactNo,
      });
      userPosted.save();
      console.log("registering a new User:", userPosted);
      return res.send(userPosted);
    } catch (error) {
      console.log("Error!", error);
      return res.send(error);
    }
  });
};
