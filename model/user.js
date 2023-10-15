const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema(
    {
        name: {
           type: String,
           reQuired: true,
        },
        email: {
            type: String,
            reQuired: true,
            unique: true,
        },
        password:{
            type: String,
            reQuired: true,
        }
    },{
        timestamps:true
    }
);

const User = mongoose.model("client",userSchema);
module.exports = User;
