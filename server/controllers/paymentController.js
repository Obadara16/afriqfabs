const stripe = require("stripe")(process.env.STRIPE_KEY);

processPayment = async (req, res) => {
  try {
    const { tokenId, amount } = req.body;
    const payment = await stripe.charges.create({
      source: tokenId,
      amount: amount,
      currency: "usd",
    });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = processPayment;