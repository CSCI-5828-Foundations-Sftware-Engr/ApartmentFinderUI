const mongoose = require("mongoose");
const user = mongoose.model("user");

module.exports = (app) => {
  app.post("/login", (req, res) => {
    const { userName, password } = req.body;
    user.findOne({userName:userName}).then((userResult => {
      if(userResult){
        if(userResult.password == password){
          return res.status(200).send({ message: "login sucess", user: userResult });
        }else{
          return res.status(201).send({ message: "wrong credentials" })
        }
        
      }else{
        return res.status(202).send({ message: "notRegistered" });
      }}))
  });
};
