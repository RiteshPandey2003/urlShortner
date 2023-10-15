const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      require: true,
    },
    visitHistory :[{ timestamps : {
      type:Number
    }}],
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
    }
  },
  { timestamps: true }
);

const URL= mongoose.model("user", urlSchema)
module.exports = URL;
