// Middleware to verify the email address
const verifyEmail = async (req, res, next) => {
    const { code } = req.params;
  
    // Find the verification record with the given code
    const verification = await Verification.findOne({ code });
  
    if (!verification) {
      return res.status(400).json({ error: "Invalid verification code" });
    }
  
    // Check if the verification code has expired
    if (verification.createdAt < Date.now() - 30 * 60 * 1000) {
      await verification.remove(); // remove the verification record
      return res.status(400).json({ error: "Verification code has expired" });
    }
  
    // Update the user's email address as verified
    const user = await User.findOneAndUpdate(
      { email: verification.email },
      { $set: { verified: true } },
      { new: true }
    );
  
    await verification.remove(); // remove the verification record
  
    // Set the user object on the request for further use
    req.user = user;
  
    next();
  };
  
  module.exports = verifyEmail

  
  
  
  