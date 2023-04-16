let mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    name: String,
    email: String,
    

})

let Userfb = mongoose.model("userfb", userSchema);

module.exports =Userfb;