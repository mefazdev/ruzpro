const mongoose = require("mongoose");

const popPlaceSchema = new mongoose.Schema({
  place:{
      type:String
  },
  totalEntry:{
      type:String
  }
})

module.exports =
mongoose.models.popPlaces || mongoose.model("popPlaces", popPlaceSchema);
