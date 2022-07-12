const morgan = require("morgan");
const express = require("express"); // start express
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const rentersRouter = require("./routes/rentersRoutes");
const customersRouter = require("./routes/customersRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const bookingController = require("./controllers/bookingController");

const app = express();
app.use(cors()); //Middleware for cors
app.options("*", cors());

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.use(morgan("dev")); // Development logging
// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
app.post(
  "/webhook-checkout",
  bodyParser.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use("/api/v1/renters", rentersRouter);
app.use("/api/v1/customers", customersRouter);
app.use("/api/v1/bookings", bookingRouter);

module.exports = app;
