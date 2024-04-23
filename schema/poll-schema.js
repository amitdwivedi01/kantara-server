const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question:{
        type:String,
        required:[true, 'Question is required']
    },
    options:[],
    isLive: {
        type:Boolean
    },
    totalVotes:{
        type:Number
    },
    results:{},
    userVotes:[]
  },
  {
    timestamps: true,
  }
);

const poll = mongoose.model("poll", pollSchema);
module.exports = poll;
