const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const detailSchema = new Schema({
  location: String,
  type: String,
  name: String,
  rating: String,
  price: String,
  photo: String,
  url: String, 
}, {
  timestamps: true
});


module.exports = mongoose.model("Detail", detailSchema);