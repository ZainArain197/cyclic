let mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String

  
})

let User = mongoose.model("user", userSchema);

module.exports =User;