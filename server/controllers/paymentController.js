const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

processPayment = async (req, res) => {
  try {
    const { reference, amount, email } = req.body;
    const payment = await paystack.transaction.initialize({
      email: email,
      amount: amount * 100, // Paystack requires the amount to be in kobo (i.e. multiplied by 100)
      reference: reference,
      currency: "NGN",
    });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { processPayment };
