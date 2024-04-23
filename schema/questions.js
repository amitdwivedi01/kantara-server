const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question:{
        type:String,
        required:[true, 'Question is required']
    },
    ans: {
        type:[]
    },
    active:{
        type:Boolean,
    },
    avatar:{
        type:String,
    }
  },
  {
    timestamps: true,
  }
);

const question = mongoose.model("question", questionSchema);
module.exports = question;
