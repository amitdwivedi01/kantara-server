const mongoose = require("mongoose");

const eventUserSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:[true,  'name is required']
    },
    companyname:{
        type:String,
        required:[true,  'company name is required']
    },
    avatar: {
        type:String,
        required:[true,  'avatar is required']
    },
    email:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

const eventUser = mongoose.model("eventUser", eventUserSchema);
module.exports = eventUser;
