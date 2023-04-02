const mongoose = require("mongoose");
const appointment = mongoose.model("appointment");

module.exports = (app) => {
    //Book appointment
  app.post("/bookappointment", (req, res) => {
    const newAppointment = new appointment({
        propertyId: req.body.propertyId,
        userName: req.body.userName,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
      });
      newAppointment.save().then((savedDoc => {
        console.log(savedDoc);
        res.status(200);
        return res.send({message: "Appointment sucessfully booked"});
    })).catch(err =>{
        console.log(err);
        res.status(404);
        return res.send({message: "Unable to book appointment", error: err});
      })
  });

  //Get appointment Details by user
  app.post("/getappointment", (req, res) => {
    console.log("Inside get appointment");
    appointment.find({userName: req.body.userName}).then((result => {
        console.log("Found appointments");
        console.log(result);
            res.status(200).send({appointments: result})  ;          
    })).catch((error =>{
        console.log(error);
        res.status(404).send(error)
    }))
});
};