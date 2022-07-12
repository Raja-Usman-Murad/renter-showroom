const Customer = require("../models/CustomerModel");
const Car = require("../models/CarModel");
const jwt = require("jsonwebtoken");

exports.protectCustomer = async (req, res, next) => {
  try {
    console.log("protected route");
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // 2) Verification token
    const verifyToken = jwt.verify(token, process.env.JWTKEY);

    // 3) Check if user still exists
    const currentCustomer = await Customer.findById(verifyToken.customer.id);
    if (!currentCustomer) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token does no longer exist.",
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = verifyToken.customer;
    req.currentUser = currentCustomer;
    next();
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};

const createSendToken = async (newCustomer, statusCode, res) => {
  const authToken = await newCustomer.generateWebToken();
  console.log("token", authToken);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", authToken, cookieOptions);

  // Remove password from output
  // newCustomer.password = undefined;

  res.status(statusCode).json({
    status: "success",
    authToken,
    data: {
      data: newCustomer,
    },
  });
};
exports.getAllCars = async (req, res, next) => {
  try {
    let cars;

    // Build Query
    // 1A) Filtering
    const queryObj = { ...req.query };
    const { fuelType, price, tires, seats } = queryObj;

    if (
      fuelType === "undefined" ||
      seats === "undefined" ||
      tires === "undefined" ||
      price === "undefined"
    ) {
      console.log("sub undefined hay yah koi ek");
      cars = await Car.find();
    } else {
      console.log("koi undefined ni");
      // 1B) Advance Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = JSON.parse(
        queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
      );
      console.log(queryStr);
      cars = await Car.find(queryStr);
      console.log(cars);
    }

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

exports.createCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, lisenceId, age, pickUpDate, returnDate } =
      req.body;
    const newCustomer = await Customer.create({
      name,
      email,
      phone,
      lisenceId,
      age,
      pickUpDate,
      returnDate,
    });
    createSendToken(newCustomer, 201, res);
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const userId = req.user.id;

    // const user = await User.findById(userId, {
    //   //purpose (the purpose of func here is to get the full document of that user)
    // }).select("-password");

    const user = await Customer.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: `user not found`,
        success: "fail",
      });
    }

    return res.status(200).json({
      message: `user found`,
      success: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `internal server error ${error}`,
      success: "fail",
    });
  }
};
