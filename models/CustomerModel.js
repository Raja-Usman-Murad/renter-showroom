const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    lowercase: true,
    unique: false,
  },
  phone: {
    type: String,
    required: [true, "Please tell us your phone number!"],
  },
  lisenceId: {
    type: String,
    required: [true, "Please tell us your lisenceID"],
  },
  age: {
    type: String,
    required: [true, "Please tell us your age!"],
  },
  pickUpDate: {
    type: Date,
    required: [true, "Please tell us pickUp date"],
  },
  returnDate: { type: Date, required: [true, "Please tell us return Date"] },
});

// GENERATING WEB TOKEN(INSTANCE METODS)
customerSchema.methods.generateWebToken = async function () {
  try {
    const data = {
      customer: {
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

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
