const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  location: String,
  details:[{type: Schema.Types.ObjectId, ref: "Detail", default:[]}],
  reviews:[{type: Schema.Types.ObjectId, ref: "Review", default:[]}],
  price: Number,
  rating: Number,

}, {
  timestamps: true
});


module.exports = mongoose.model("Trip", tripSchema);