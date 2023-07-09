const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
    
    name:{
        type:String,
        // required:[true,'Please add a title'],
        // unique:true,
        // trim:true,
        // maxlength :[10,'NOt more than 20']

    }, 
    uid:{
        type:String,
        // required:[true,'Please add a title'],
        // unique:true,
        trim:true,
       

    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    profPic:{
        type:String
    }
    
   
})
  
module.exports = mongoose.models.User || mongoose.model('User',UserSchema)