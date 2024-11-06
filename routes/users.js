  var express = require("express");
  var moment = require("moment");
  var router = express.Router();

  require("../models/connection");
  const fetch = require("node-fetch");
  const User = require("../models/users");


  //
  router.post('/signin', (req, res) => {
    User.find({
      email: { $regex: new RegExp(req.body.email, "i") },
      password: { $regex: new RegExp(req.body.password, "i") },
    }).then((data) => {
      if (data.length !== 0) {
        res.json({ result: true, user: data });
      } else {
        res.json({ result: false, error: "No User found" });
      }
    });
  })


  router.post('/signup', (req, res) => {
    User.find({
      email: { $regex: new RegExp(req.body.email, "i") },
      password: { $regex: new RegExp(req.body.password, "i") },
    }).then(() => {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        User.findOne({ email: req.body.email }).then(email => {
            if (email) {
                res.json({ result: false, error: 'User already exists' });
            } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });

                    newUser.save().then(newUser => {
                        res.json({ result: true, user: newUser });
                    })
            }
        })
    })

  });

  module.exports = router;
