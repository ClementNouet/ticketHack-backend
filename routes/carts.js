var express = require("express");
var moment = require("moment");
var router = express.Router();

require("../models/connection");
const fetch = require("node-fetch");
const Cart = require("../models/carts");
const Trip = require("../models/trips");

// Route POST qui permet de recupérer les infos du trip que l'on veut ajouter au cart
router.post("/", (req, res) => {
  Trip.findById(req.body.id).then((data) => {
    if (data) {
      const newTrip = new Cart({
        departure: data.departure,
        arrival: data.arrival,
        date: data.date,
        price: data.price,
      });
      newTrip.save().then((newDoc) => res.json({ result: true, trip: newDoc }));
      console.log("Trip added to cart");
    } else {
      res.json({ result: false, error: "No trip added to cart" });
    }
  });
});

module.exports = router;
