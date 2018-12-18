const express = require("express");
const router  = express.Router();
const axios   = require("axios")

router.post("/locationInfo", (req, res, next)=> {
  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+${req.body.city}&key=${process.env.GOOGLE_KEY}`)
  .then((hotels)=>{
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+${req.body.city}&key=${process.env.GOOGLE_KEY}`)
    .then((restaurants)=>{
      axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=activities+${req.body.city}&key=${process.env.GOOGLE_KEY}`)
      .then((activities)=>{
        hotels2 = hotels.data.results.map((result)=>{
          if(result.photos){
            result.photos = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos["0"].photo_reference}&key=${process.env.GOOGLE_KEY}`
            return result
          }
        })
        restaurants2 = restaurants.data.results.map((result)=>{
          if(result.photos){
            result.photos = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos["0"].photo_reference}&key=${process.env.GOOGLE_KEY}`
            return result
          }
        })
        activities2 = activities.data.results.map((result)=>{
          if(result.photos){
            result.photos = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos["0"].photo_reference}&key=${process.env.GOOGLE_KEY}`
            return result
          }
        })
        res.json({
          hotels: hotels2,
          restaurants: restaurants2,
          activities: activities2
        })
      })
      .catch((err)=>{
        res.json(err)
      })
    })
    .catch((err)=>{
      res.json(err)
    })
  })
  .catch((err)=>{
    res.json(err)
  })
})



module.exports = router;