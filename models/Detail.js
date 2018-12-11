const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const detailSchema = new Schema({
  activity: String,
  description: String,
  cost: Number,
  url: String, 
}, {
  timestamps: true
});


module.exports = mongoose.model("Detail", detailSchema);