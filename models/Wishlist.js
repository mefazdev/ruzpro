  const mongoose = require("mongoose");

  const wishlistSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    propId:{
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
  })

  module.exports =
  mongoose.models.wishlist || mongoose.model("wishlist", wishlistSchema);
