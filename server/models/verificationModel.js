const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h', // Verification code will expire after 24 hours
  },
});

module.exports = mongoose.model('Verification', VerificationSchema);
