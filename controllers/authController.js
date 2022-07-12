const Renter = require("../models/RenterModel");
const jwt = require("jsonwebtoken");

const createSendToken = async (newRenter, statusCode, res) => {
  const authToken = await newRenter.generateWebToken();
  console.log(newRenter);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", authToken, cookieOptions);

  // Remove password from output
  // newRenter.password = undefined;

  res.status(statusCode).json({
    status: "success",
    authToken,
    data: {
      data: newRenter,
    },
  });
};

exports.protect = async (req, res, next) => {
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
    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // 2) Verification token
    const verifyToken = jwt.verify(token, process.env.JWTKEY);

    // 3) Check if user still exists
    const currentRenter = await Renter.findById(verifyToken.user.id);
    if (!currentRenter) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token does no longer exist.",
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = verifyToken.user;
    req.currentUser = currentRenter;
    next();
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};

exports.singup = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;
  try {
    if (password !== passwordConfirm) {
      return res
        .status(422)
        .json({ status: "fail", message: "Pasword doesnot Match" });
    }

    const renterExist = await Renter.findOne({ email });
    if (renterExist) {
      return res
        .status(422)
        .json({ status: "fail", message: "user already exist" });
    }
    //pasword hashing in Model befor save
    const newRenter = await Renter.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    createSendToken(newRenter, 201, res);
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};

exports.updateRenterInfo = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const filteredBody = {
      name,
      email,
    };
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        message: `This route is not for password updates. Please use /updateMyPassword.`,
        status: "fail",
      });
    }
    const updatedRenter = await Renter.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRenter) {
      return res.status(404).json({
        message: `No car found with that ID`,
        status: "fail",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        data: updatedRenter,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
exports.updateMyPassword = async (req, res, next) => {
  try {
    // 1) Get user from collection
    const renter = await Renter.findById(req.user.id).select("+password");
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(422).json({
        status: "fail",
        message: "Password/confirm password doesnot Match",
      });
    }
    // 2) Check if POSTed current password is correct
    if (
      !(await renter.correctPassword(req.body.passwordCurrent, renter.password))
    ) {
      return res.status(401).json({
        message: `Your current password is wrong.`,
        status: "fail",
      });
    }

    // 3) If so, update password
    renter.password = req.body.password;
    renter.passwordConfirm = req.body.passwordConfirm;
    console.log(renter);
    await renter.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(renter, 200, res);
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
exports.singin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        message: `Please provide email and password!'`,
        status: "fail",
      });
    }

    // 2) Check if user exists && password is correct
    const renterExist = await Renter.findOne({ email: email }).select(
      "+password"
    );
    if (
      !renterExist ||
      !(await renterExist.correctPassword(password, renterExist.password))
    ) {
      return res.status(401).json({
        message: `Incorrect email or password`,
        status: "fail",
      });
    }

    // 3) If everything ok, send token to client
    createSendToken(renterExist, 200, res);
  } catch (error) {
    return res.status(400).json({
      message: `Some error Ocuured : ${error}`,
      status: "fail",
    });
  }
};
exports.getRenterUser = async (req, res) => {
  try {
    console.log("usman");
    const userId = req.user.id; //req.userId

    // const user = await User.findById(userId, {
    //   //purpose (the purpose of func here is to get the full document of that user)
    // }).select("-password");

    const user = await Renter.findById(userId);

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
