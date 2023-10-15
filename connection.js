const mongoose = require("mongoose");

const connectMongoose = async(url)=>{
    return mongoose.connect(url)
    .then(()=>{
        console.log("connected");
    });
}

module.exports = {
    connectMongoose,
}