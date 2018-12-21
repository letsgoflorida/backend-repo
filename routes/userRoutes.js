const express     = require("express");
const router      = express.Router();
const User        = require("../models/User");
const passport    = require("passport");
const bcrypt      = require("bcryptjs");

router.post("/signup", (req, res, next) => {

  User.findOne({username: req.body.username}, (err, foundUser) => {

    if(err){
      console.log(err)
      res.status(500).json({message: "Could not properly create the user."});
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    const hashedPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPass;
    User.create(req.body)
    .then((newUser)=>{
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }
        console.log(newUser)
        res.json(newUser);
      });
    })
    .catch(()=>{
      res.status(400).json({ message: "Could not properly save the user." });
    })
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
  if(req.user) {
    req.logout();
    res.json({message: "Log out successful!"});
  } else {
    res.json({message:"There's no user logged in"})
  }
});

router.post("/edit", (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body)
  .then((user)=>{
    res.json(user)
  })
  .catch(()=>{
    res.status(400).json({message: "Could not properly update the user."})
  })
})

router.post("/getUser", (req, res, next) => {
  User.findById(req.user._id).populate("trips")
  .then((user)=>{
    res.json(user)
  })
  .catch(()=>{
    res.status(400).json({message: "Could not properly find the user."})
  })
})

router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
      res.json(req.user);
      return;
  }
  res.status(500).json({message: "Unauthorized"});
});



module.exports = router;