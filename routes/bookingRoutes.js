const express = require("express");
const bookingController = require("../controllers/bookingController");
const customerController = require("../controllers/customerController");

const router = express.Router();
router
  .route("/checkout-session/:carId")
  .get(
    customerController.protectCustomer,
    bookingController.getCheckoutSession
  );

module.exports = router;
