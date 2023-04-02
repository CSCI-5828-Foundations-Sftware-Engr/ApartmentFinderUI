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

  //Function to show get appointments page. This page shows the list of appointments made by the user
  app.post("/getappointment", (req, res) => {
    console.log("Inside get appointment");
    appointment.find({userName: req.body.userName}).then((result => {
        if(Object.keys(result).length >0){
            console.log("Found appointments");
            console.log(result);
                res.status(200).send({appointments: result})  ;  
        }else{
            console.log("No appointments for userName: ", req.body.userName);
            return res.status(201).send({message: "Appointment does not exist"});
        }
        
    })).catch((error =>{
        console.log(error);
        res.status(404).send(error)
    }))
});

//Cancel appointment made by user for a particular date, time, and propertyId
app.post("/cancelappointment", (req, res) => {
    console.log("Inside cancel appointment function");
    appointment.findOne({userName: req.body.userName, 
        appointmentDate: req.body.appointmentDate, 
        appointmentTime: req.body.appointmentTime,
        propertyId: req.body.propertyId}).then((result => {
            if(result){
                console.log("Appointment found");
                appointment.deleteOne({_id: result._id}).then(function(){
                    console.log("Data deleted"); // Success
                    return res.status(200).send({message: "Data deleted"})
                }).catch(function(error){
                    console.log(error); // Failure
                    return res.status(202).send({message: error})
                });

            }else{
                return res.status(201).send({message: "Appointment does not exist"});
            }
                 
    })).catch((error =>{
        console.log(error);
        return res.status(404).send(error)
    }))
});
};