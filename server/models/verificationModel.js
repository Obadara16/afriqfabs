const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30m", // expire verification code after 30 minutes
  },
});

module.exports = mongoose.model("Verification", verificationSchema);
