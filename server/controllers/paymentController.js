const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/paymentModel");

processPayment = async (req, res) => {
  try {
    const { amount, email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires the amount to be in cents (i.e. multiplied by 100)
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: email,
    });
    const newPayment = new Payment({
      email: email,
      amount: amount,
      reference: paymentIntent.id,
      status: "pending",
    });
    await newPayment.save();
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { processPayment };
