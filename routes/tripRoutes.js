const express     = require("express");
const router      = express.Router();
const Trip        = require("../models/Trip");
const User        = require("../models/User");

router.get("/", (req, res, next) => {
  Trip.find()
  .then((trips)=>{ 
      res.json(trips)
  })
  .catch((err)=>{
      res.json(err);
  }) 
});

router.post("/detail", (req, res, next)=>{
  Trip.findById(req.body.trip).populate("details")
  .then((trip)=>{
    console.log(trip)
    res.json(trip);   
  })
  .catch((err)=>{
    res.json(err); 
  })
})

router.post("/new", (req, res, next)=>{
  Trip.create({user: req.user._id, location: req.body.location})
  .then((trip)=>{
    User.findByIdAndUpdate(req.user._id, {$push: {trips: trip._id}}, {new: true})
    .then((user)=>{
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

router.post("/:id/delete", (req, res, next)=>{
  Trip.findByIdAndRemove(req.params.id)
  .then((trip)=>{
      if(trip === null){
          res.json({message: "Sorry this trip could not be found"})
          return;
      }
      User.findByIdAndUpdate(trip.user, {$pull: {trips: trip._id}}, {new: true})
      .then((user)=>{
        res.json([
          {message: "Trip successfully deleted"},
          trip, user
        ])
      })
      .catch((err)=>{
        res.json(err)
      })
    })
  .catch((err)=>{
      res.json(err)
  })
})

// router.post("/:id/edit", (req, res, next)=>{
//   Trip.findByIdAndUpdate(req.params.id, req.body)
//   .then((trip)=>{
//       if(trip === null){
//           res.json({message: "Sorry we could not find this task"})
//           return;
//       }
//       res.json([{message: "This task has been successfully updated"},
//       trip])
//   })
//   .catch((err)=>{
//       res.json(err)
//   })
// })

module.exports = router;