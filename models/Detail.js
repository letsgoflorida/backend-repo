const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const detailSchema = new Schema({
  place: String,
  rating: String,
  cost: Number,
  photo: String,
  url: String, 
}, {
  timestamps: true
});


module.exports = mongoose.model("Detail", detailSchema);