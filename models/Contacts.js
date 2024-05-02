 
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  propId: {
    type: String,
  },
  userId: {
    type: String,
  },
  phone:{
    type:String
  },
  whatsapp:{
    type:String
  },
  email:{
    type:String
  },
  address:{
    type:String
  },
  propType:{
    type:String
  },
  town:{
    type:String
  },
  district:{
    type:String
  },
  locality:{
    type:String
  },
  date:{
    type:String
  }
});

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
