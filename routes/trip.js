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
router.post("/", (req, res) => {
  // Recupération de la date dans le body de la requete (la date de requete doit etre au format YYYY-MM-DD )
  const targetDate = new Date(req.body.date);
  // creation de la variable de début de date
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);
  // creation de la variable de fin de date
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: { $gte: startOfDay, $lte: endOfDay },
  }).then((data) => {
    if (data.length !== 0) {
      res.json({ result: true, trips: data });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

module.exports = router;
