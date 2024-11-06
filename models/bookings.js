const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
  start: String,
});

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
