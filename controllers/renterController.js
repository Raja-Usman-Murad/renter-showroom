const Car = require("../models/CarModel");
exports.createCar = async (req, res, next) => {
  try {
    const { seats, tires, fuelType, price, photo } = req.body;
    const renterId = req.user.id;
    console.log(req.body);
    const newCar = await Car.create({
      renterId,
      seats,
      tires,
      fuelType,
      price,
      photo,
    });
    return res.status(201).json({
      status: "success",
      message: "car add successfully",
      data: newCar,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
exports.getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ renterId: req.user.id });
    if (!cars) {
      return res.status(404).json({
        status: "fail",
        message: "No car found in DataBase",
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
exports.getCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(400).json({
        message: `car not found`,
        success: "fail",
      });
    }
    return res.status(200).json({
      message: `user found`,
      success: "success",
      data: {
        car,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
exports.updateCar = async (req, res, next) => {
  try {
    const { seats, tires, fuelType, price, photo } = req.body;
    console.log(req.body, req.params.id);
    const updateCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateCar) {
      return res.status(404).json({
        message: `No car found with that ID`,
        status: "fail",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        data: updateCar,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
exports.deleteCar = async (req, res, next) => {
  console.log(req.params.id, req.user.id);
  try {
    let deleteCar = await Car.findById({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleteCar) {
      return res.status(404).json({
        message: `Not found`,
        status: "fail",
      });
    }
    deleteCar = await Car.findByIdAndDelete(req.params.id);
    return res.status(204).send({
      status: "success",
      message: "Car delete successfully",
      data: null,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
