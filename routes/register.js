const mongoose = require("mongoose");
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
      userPosted.save().then(savedDoc =>{
        console.log(savedDoc);
        res.status(200);
        return res.send({message: "User sucessfully registered"});
      }).catch(err =>{
        console.log(err);
        res.status(404);
        return res.send({message: "UserName already exists"});
      })
  }
  catch (error) {
    console.log("Error!", error);
    return res.send(error);
  }
})
};
