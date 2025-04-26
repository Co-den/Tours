const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");


// backend route to create checkout session
exports.getCheckoutSession = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId); // Get tour details from DB

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tour.name,
              description: tour.summary,
              images: [`${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`],
            },
            unit_amount: tour.price * 100, // price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      client_reference_id: req.params.tourId,
      customer_email: req.user.email,
    });

    res.status(200).json({
      status: 'success',
      data: {
        sessionId: session.id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating checkout session');
  }
};


const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100;
  console.log("Creating booking for user:", user, "and tour:", tour);
  await Booking.create({ tour, user, price });
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
    console.log("Webhook error:", err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
