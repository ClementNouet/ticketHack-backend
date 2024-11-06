require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("./models/connection");
const Trip = require("./models/trips");
const Cart = require("./models/carts");
const Booking = require("./models/bookings");
const User = require("./models/users");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var tripsRouter = require("./routes/trip");
var cartRouter = require("./routes/carts");
var bookingsRouter = require("./routes/bookings");

var app = express();
const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/trips", tripsRouter);
app.use("/cart", cartRouter);
app.use("/bookings", bookingsRouter);

module.exports = app;
