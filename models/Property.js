 
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  propType: {
    type: String,
  },
  propId:{
type:String
  },

  transType: {
    type: String,
  },
  ownership: {
    type: String,
  },
  price: {
    type:Object,
  },
   
  displayPrice: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  town: {
    type: String,
  },
  locality: {
    type: String,
  },
  street: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  secondaryPhone: {
    type: String,
  },
  whatsappNo: {
    type: String,
  },
  plotArea: {
    type: String,
  },
  plotUnit: {
    type: String,
  },
  isGatedProperty: {
    type: Boolean,
  },
  inResidenceColony: {
    type: Boolean,
  },
  builtArea: {
    type: String,
  },

  builtUnit: {
    type: String,
  },
  bedrooms: {
    type: String,
  },
  bathrooms: {
    type: String,
  },
  floorNo: {
    type: String,
  },
  totalFloors: {
    type: String,
  },
  constructedYear: {
    type: String,
  },
  readyToMove: {
    type: Boolean,
  },
  usageStatus: {
    type: String,
  },
  agriType: {
    type: String,
  },
  otherAgri: {
    type: String,
  },
  amenities: {
    type: Object,
  },
  distance: {
    type: Object,
  },
  images: {
    type:Array,
  },
  roadAccess:{
type:Object
  },
  details: {
    type: Boolean,
  },
  locationType: {
    type: Object,
  },
  
  distance: {
    type: Object,
  },
  nearby:{
    type:Object 
  },
  active:{
    type:Boolean
  },
  status:{
type:String
  },

  date:{
    type:String
  }
  
});

module.exports =
  mongoose.models.Property || mongoose.model("Property", propertySchema);


  // twoWheelerAcces: {
  //   type: String,
  // },
  // fourWheelerAccess: {
  //   type: String,
  // },