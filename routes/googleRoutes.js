const express = require("express");
const router  = express.Router();
const Axios   = require("axios")

router.get("/:city", (req, res, next)=> {
  Axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+${req.params.city}&key=${process.env.GOOGLE_KEY}`)
  .then((hotels)=>{
    res.json(hotels)
  })
  .catch((err)=>{
    res.json(err)
  })
})



module.exports = router;