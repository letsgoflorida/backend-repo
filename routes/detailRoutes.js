const express     = require("express");
const router      = express.Router();
const Trip        = require("../models/Trip");
const Detail      = require("../models/Detail");

router.post("/new", (req, res, next)=>{
  Detail.create(req.body.detail)
  .then((detail)=>{
    Trip.findByIdAndUpdate(req.body.detail.trip_id, {$push: {details: detail._id}}, {new: true})
    .then((trip)=>{
      res.json(trip);
    })
    .catch((err)=>{
      res.json(err);
    })
  })
  .catch((err)=>{
      res.json(err);
  })
})

module.exports = router;