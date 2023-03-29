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
      userPosted.save().then(savedDoc =>{
        console.log(savedDoc);
        res.status(200);
        return res.send({message: "User sucessfully registered"});
      }).catch(err =>{
        console.log(err);
        res.status(404);
        return res.send({message: "UserName already exists"});
      })
      // const result = userPosted.save(function(err, result){
      //   if(err){
      //     console.log(err);
      //     res.status(404);
      //     return res.send({message: "UserName already exists"});
      //   }else{
      //     console.log(result);
      //     res.status(200);
      //     return res.send({message: "User sucessfully registered"});
      //   }
      // });
    //   console.log(result);
    //   console.log("registering a new User:", userPosted);
    //   res.status(200);
    //   return res.send(userPosted);
    // } catch (error) {
    //   console.log("Error!", error);
    //   return res.send(error);
    // }
  }
  catch (error) {
    console.log("Error!", error);
    return res.send(error);
  }
})
};
