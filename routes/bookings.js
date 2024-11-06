var express = require("express");
var moment = require("moment");
var router = express.Router();

require("../models/connection");
const fetch = require("node-fetch");
const Cart = require("../models/carts");
const Trip = require("../models/trips");
const Booking = require("../models/bookings");

// Route POST qui permet de transferer le trip qui est dans le cart vers le booking
router.post("/:id", (req, res) => {
  Cart.findById(req.params.id).then((data) => {
    if (data) {
      const newBooking = new Booking({
        departure: data.departure,
        arrival: data.arrival,
        date: data.date,
        price: data.price,
        start: moment(data.date).fromNow(),
      });
      newBooking
        .save()
        .then((newDoc) => res.json({ result: true, bookings: newDoc }));
      console.log("Trip added to bookings");

      Cart.deleteOne({ _id: req.params.id }).then(() => {});
    }
  });
});

// Route GET qui permet de recupérer tous les voyages présent sur la BDD bookings
router.get("/", (req, res) => {
  Booking.find().then((data) => {
    if (data.length > 0) {
      res.json({ result: true, bookings: data });
    } else {
      res.json({ result: false, error: "booking empty" });
    }
  });
});

module.exports = router;
