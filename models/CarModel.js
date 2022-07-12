const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //for hashing password

const carSchema = new mongoose.Schema({
  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Renter",
  },
  seats: {
    type: String,
    required: [true, "Please tell us about car seats capacity"],
  },
  tires: {
    type: String,
    required: [true, "Please tell us about car tires condition"],
  },
  fuelType: {
    type: String,
    required: [true, "Please tell us about car fuel type"],
  },
  price: {
    type: String,
    required: [true, "Please tell us about car price"],
  },
  photo: {
    type: String,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
