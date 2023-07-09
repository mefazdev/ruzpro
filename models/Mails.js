const mongoose = require('mongoose');

const MailSchema  = new mongoose.Schema({
    
    name:{
        type:String,
         

    }, 
    email:{
        type:String,
    
       

    },
    phone:{
        type:String
    },
     message:{
        type:String
     }
    
   
})
  
module.exports = mongoose.models.Mail || mongoose.model('Mail',MailSchema)