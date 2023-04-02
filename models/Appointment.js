const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentModelSchema = new Schema({
  propertyId: {
    type: String,
  },
  userName: {
    type: String,
  },
  appointmentDate: {
    type: String,
  },
  appointmentTime: {
    type: String,
  },
});

module.exports = mongoose.model("appointment", AppointmentModelSchema, "appointments");