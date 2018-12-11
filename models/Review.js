const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  status: {type: String, enum:["local", "visitor"]},
  rating: Number,
  content: String,
  trip: {type: Schema.Types.ObjectId, ref: "Trip"},
},
  {
    timestamps: true
  });

module.exports = mongoose.model("Review", reviewSchema);