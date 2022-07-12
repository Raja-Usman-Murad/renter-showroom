const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  price: {
    type: String,
    required: [true, "Please tell us about car price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
