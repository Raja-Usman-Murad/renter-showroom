const express = require("express");
const renterController = require("../controllers/renterController");
const authController = require("../controllers/authController");
const customerController = require("../controllers/customerController");

const router = express.Router();
router.route("/signup").post(authController.singup);
router.route("/signin").post(authController.singin);
router
  .route("/updateRenterInfo")
  .patch(authController.protect, authController.updateRenterInfo);
router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updateMyPassword);
router
  .route("/getRenterUser")
  .get(authController.protect, authController.getRenterUser);
router
  .route("/")
  .get(authController.protect, renterController.getAllCars)
  .post(authController.protect, renterController.createCar);
router
  .route("/:id")
  .get(customerController.protectCustomer, renterController.getCar)
  .patch(authController.protect, renterController.updateCar)
  .delete(authController.protect, renterController.deleteCar);

module.exports = router;
