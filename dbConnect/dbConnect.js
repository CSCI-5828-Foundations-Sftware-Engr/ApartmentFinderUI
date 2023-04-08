const mongoose  = require('mongoose');
const DB_URI    = "mongodb+srv://shka5709:fseData123@fseproject.j4lmokk.mongodb.net/Property?retryWrites=true&w=majority";

function dbconnect() {
    mongoose.connect(DB_URI, { useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.log(err));
    return mongoose.connection
  }
  
  function dbclose() {
    return mongoose.disconnect();
  }

module.exports = {dbconnect, dbclose};