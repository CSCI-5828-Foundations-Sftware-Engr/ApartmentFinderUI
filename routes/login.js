const mongoose = require("mongoose");
const user = mongoose.model("user");

module.exports = (app) => {
  app.post("/login", (req, res) => {
    const { userName, password } = req.body;
    user.findOne({userName:userName}).then((userResult => {
      if(userResult){
        if(userResult.password == password){
          console.log("Inside correct password")
          res.status(200)
          res.send({ message: "login sucess", user: userResult });
        }else{
          res.status(201)
          res.send({ message: "wrong credentials" });
        }
        
      }else{
        res.status(202)
        res.send({ message: "notRegistered" });
      }}))
    // const userResult = user.findOne({ userName: userName });
    // console.log("Inside login node")
    // console.log(userResult)

     //user.findOne({ userName: userName }, (err, user) => {
    // if (userResult) {
    //   if (password === userResult.password) {
    //     res.send({ message: "login sucess", user: userResult });
    //   } else {
    //     res.send({ message: "wrong credentials" });
    //   }
    // } else {
    //   res.send("not registered");
    // }
     //});
  });
};
