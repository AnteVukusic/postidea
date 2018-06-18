const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//  Load User Model
const User = require("../../models/User");

//  Load validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//  @route    Test route
//  @desc     Route for testing
//  @access   Public

router.get("/test", (req, res) =>
  res.json({
    msg: "user success"
  })
);

//  @route    Register route
//  @desc     Route for new user registration
//  @access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.exists = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//  @route    Login route
//  @desc     Logging into your account
//  @access   Public
router.post("/login", (req, res) => {
  //  Check for input errors
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //  Find user by email
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        errors.notfound = "Email not found";
        return res.status(404).json(errors);
      }

      //  Compare hashed passwords
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          };

          //  Sign Bearer Token
          jwt.sign(payload, keys.secret, { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({
              msg: "sucess",
              token: "Bearer " + token,
              id: user._id
            });
          });
        } else {
          errors.incorrectpassword = "Password incorrect";
          return res.json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
