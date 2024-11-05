var express = require("express");
var moment = require("moment");
var router = express.Router();

require("../models/connection");
const fetch = require("node-fetch");
const Trip = require("../models/trips");

/* router.get("/", (req, res) => {
  Trip.find().then((data) => {
    res.json({ trips: data });
  });
});
*/

// Route GET qui permet de recupérer les trips qui correpondent au critères de recherche ( depart, arrivée et date précise)
router.get("/", (req, res) => {
  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: req.body.date,
  }).then((data) => {
    if (data) {
      res.json({ result: true, trips: data });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

module.exports = router;
