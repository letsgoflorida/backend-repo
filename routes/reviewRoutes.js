const express     = require("express");
const router      = express.Router();
const Trip        = require("../models/Trip");
const User        = require("../models/User");
const Review      = require("../models/Review");


router.post("/:id/new", (req, res, next)=>{
  req.body.user = req.user._id;
  req.body.trip = req.params.id;
  Review.create(req.body)
  .then((review)=>{
    Trip.findByIdAndUpdate(req.params.id, {$push: {reviews: review._id}}, {new: true})
    .then((trip)=>{
      User.findByIdAndUpdate(req.user._id, {$push: {reviews: review._id}}, {new: true})
      .then((user)=>{
        res.json([review, trip, user])
      })
      .catch((err)=>{
        res.json(err);
      });
    })
    .catch((err)=>{
      res.json(err);
    });
  })
  .catch((err)=>{
    res.json(err);
  })
})

router.post("/:id/delete", (req, res, next)=>{
  if(!req.user) {
    res.json({message: "Sorry, you need to be logged in to delete a review."})
    return
  }
  Review.findById(req.params.id)
  .then((review)=>{
    if(!req.user._id === review.user) {
      res.json({message: "Sorry, you didn't create this review"})
      return
      }
      Trip.findByIdAndUpdate(review.trip, {$pull: {reviews: review._id}}, {new: true})
      .then((trip)=>{
        User.findByIdAndUpdate(review.user, {$pull: {reviews: review._id}}, {new: true})
        .then((user)=>{
          Review.findByIdAndDelete(req.params.id)
          .then((review)=>{
            res.json([trip, user, review])
          })
          .catch((err)=>{
            res.json(err);
          })
        })
        .catch((err)=>{
          res.json(err);
        })
      })
      .catch((err)=>{
        res.json(err);
    })
    .catch((err)=>{
      res.json(err);
    })
  })
  .catch((err)=>{
    res.json(err);
  })
})

router.get("/:id", (req, res, next) => {
  Review.find({trip: req.params._id})
  .then((reviews)=>{ 
      res.json(reviews)
  })
  .catch((err)=>{
      res.json(err);
  }) 
});

module.exports = router;