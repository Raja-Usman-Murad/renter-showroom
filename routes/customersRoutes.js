const express = require("express");
const customerController = require("../controllers/customerController");

const router = express.Router();
router
  .route("/")
  .get(customerController.protectCustomer, customerController.getAllCars)
  .post(customerController.createCustomer);
router
  .route("/getCustomer")
  .get(customerController.protectCustomer, customerController.getCustomer);
module.exports = router;
