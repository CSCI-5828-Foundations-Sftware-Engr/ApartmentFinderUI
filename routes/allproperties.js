const mongoose = require("mongoose");
const propertyData = mongoose.model("propertyData");

// module.exports = (app) => {
//     app.get("/allproperties", (req, res) => {
//         console.log("Inside all properties");
//         propertyData.find().then((result => {
//                 res.status(200).send(result)            
//         })).catch((error =>{
//             res.status(404).send(error)
//         }))
//     });
//   };

  app.get("/allproperties", (req, res) => {
    console.log("Inside all properties");
    propertyData.find().then((result => {
            res.status(200).send(result)            
    })).catch((error =>{
        res.status(404).send(error)
    }))
});