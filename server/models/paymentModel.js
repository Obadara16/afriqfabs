// models.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
