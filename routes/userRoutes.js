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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failure) => {
    if (err) {
      res.json({message: "Something went wrong authenticating user"});
      return;
    }

    if (!theUser) {
      res.json(failure);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.json({message: "Session save went bad."});
        return;
      }
      res.json(req.user);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.json({message: "Log out success!"});
});

module.exports = router;