const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message:{
        type:String
    },
    time:{
        
    },
    author:{}
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model("message", messageSchema);
module.exports = message;
