const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Customer = require("../models/CustomerModel");
const Car = require("../models/CarModel");
const jwt = require("jsonwebtoken");
exports.getCheckoutSession = async (req, res) => {
  try {
    // 1) Get the currently booked car
    const car = await Car.findById(req.params.carId);
    // console.log(car);

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/thankyou`,
      cancel_url: `http://localhost:3000/car/${car._id}`,
      customer_email: req.currentUser.email,
      client_reference_id: req.params.carId,
      line_items: [
        {
          name: "car",
          description: `Fuel Type: ${car.fuelType}, Tyres: ${car.tires}, Seats: ${car.seats}`,
          amount: car.price * 100,
          currency: "usd",
          quantity: 1,
        },
      ],
      mode: "payment",
    });

    if (!car) {
      return res.status(400).json({
        message: `car not found`,
        success: "fail",
      });
    }

    return res.status(200).json({
      message: `car found`,
      success: "success",
      session,
    });
  } catch (error) {
    return res.status(500).json({
      message: `internal server error ${error}`,
      success: "fail",
    });
  }
};

const createBookingCheckout = async (session) => {
  const carId = session.client_reference_id;
  const customerId = (await Customer.findOne({ email: session.customer_email }))
    .id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ carId, customerId, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};
