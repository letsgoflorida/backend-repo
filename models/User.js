const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, lowercase: true, required: true},
  confirmed: {type: Boolean, default: false},
  admin: {type: Boolean, default: false},
  trips:[{type: Schema.Types.ObjectId, ref: "Trip", default:[]}],
  reviews:[{type: Schema.Types.ObjectId, ref: "Review", default:[]}],
}, {
  timestamps: true
});


module.exports = mongoose.model("User", userSchema);