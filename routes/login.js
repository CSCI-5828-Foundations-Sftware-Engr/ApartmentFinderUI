const mongoose = require("mongoose");
const user = mongoose.model("user");

module.exports = (app) => {
  app.post("/login", (req, res) => {
    const { userName, password } = req.body;
    const userResult = user.find({ userName: userName });

    // user.find({ userName: userName }, (err, user) => {
    if (userResult) {
      if (password === userResult.password) {
        res.send({ message: "login sucess", user: userResult });
      } else {
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not registered");
    }
    // });
  });
};
