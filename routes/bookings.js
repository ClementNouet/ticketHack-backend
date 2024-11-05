var express = require("express");
var moment = require("moment");
var router = express.Router();

require("../models/connection");
const fetch = require("node-fetch");
const Cart = require("../models/carts");
const Trip = require("../models/trips");
const Booking = require("../models/bookings");

// Route POST qui permet de recupérer les infos du trip que l'on veut ajouter au cart
router.post("/", (req, res) => {
  Cart.findById(req.body.id).then((data) => {
    if (data) {
      const newBooking = new Booking({
        departure: data.departure,
        arrival: data.arrival,
        date: data.date,
        price: data.price,
      });
      newBooking
        .save()
        .then((newDoc) => res.json({ result: true, bookings: newDoc }));
      console.log("Trip added to bookings");
    } else {
      res.json({ result: false, error: "No trip added to bookings" });
    }
  });
});
/*
// Route DELETE qui permet de supprimer le voyage concerné et de renvoyer les voyage contenu dans le cart
router.delete("/", (req, res) => {
  Cart.deleteOne({ _id: req.body.id }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      Cart.find().then((data) => res.json({ result: true, trip: data }));
      console.log("Trip successfully deleted");
    } else {
      res.json({ result: false, error: "No trip deleted" });
    }
  });
});
*/

// Route GET qui permet de recupérer tous les voyages présent sur la BDD cart
router.get("/", (req, res) => {
  Booking.find().then((data) => res.json({ result: true, cart: data }));
});

module.exports = router;
