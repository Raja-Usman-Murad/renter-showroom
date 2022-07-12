const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //for hashing password

const renterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
  },
});

// WE ARE HASHING THE PASSWORD
renterSchema.pre("save", async function (req, res, next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// GENERATING WEB TOKEN(INSTANCE METODS)
renterSchema.methods.generateWebToken = async function () {
  try {
    const data = {
      user: {
        id: this._id,
      },
    };
    let token = jwt.sign(data, process.env.JWTKEY, {
      expiresIn: process.env.JWTEXPIRY,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

renterSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Renter = mongoose.model("Renter", renterSchema);

module.exports = Renter;
