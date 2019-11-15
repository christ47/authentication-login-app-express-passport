//schema for different fields for users

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
// object for all our fields
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },

  password: {
    type: String,
    require: true
  },

  date: {
    type: Date,
    default: Date.now,
    require: true
  },

})

//create module
const User = mongoose.model('User', UserSchema);
// (Model name, user schema)


//export module
module.exports = User;
