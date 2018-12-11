const express     = require("express");
const router      = express.Router();
const User        = require("../models/User");
const passport    = require("passport");
const bcrypt      = require("bcryptjs");

router.post("/signup", (req, res, next) => {

  User.findOne({username: req.body.username}, (err, foundUser) => {

    if(err){
      res.status(500).json({message: "Could not properly create the user."});
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    const hashedPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  
    const newUser = new User({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
    });

    newUser.save(err => {
      if (err) {
        res.status(400).json({ message: "Could not properly save the user." });
        return;
      }
          
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }
        res.json(newUser);
      });
    });
  });
});

module.exports = router;