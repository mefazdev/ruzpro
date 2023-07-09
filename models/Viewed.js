const mongoose = require("mongoose");

const ViewedSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  propType: {
    type: String,
  },
  town: {
    type: String,
  },
  district: {
    type: String,
  },
  transType: {
    type: String,
  },
  propId: {
    type: String,
  },
  date: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports =
  mongoose.models.Viewed || mongoose.model("Viewed", ViewedSchema);
