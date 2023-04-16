let mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    username: String,
    password: String,


})

let Userpass = mongoose.model("userpass", userSchema);

module.exports = Userpass;