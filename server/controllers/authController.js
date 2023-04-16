const mongoose = require('mongoose')
const User = require("../models/authModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const Verification = require("../models/verificationModel")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail, sendResetPasswordEmail } = require("../services/email.js");

require("dotenv").config()

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const createTokens = async (user) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  await user.save();

  return { accessToken, refreshToken };
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email is not valid' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect Email' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Incorrect Password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'Email not verified. Please check your email and click on the verification link to verify your account.' });
    }

    const tokens = await createTokens(user);

    const userWithTokens = { user: { ...user.toObject(), password: undefined }, tokens };

    res.status(200).json(userWithTokens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;
  console.log("before verifying", refreshToken)

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (refreshToken !== user.refreshToken) {
      console.log(refreshToken)
      console.log(user.refreshToken)
      return res.status(401).json({ error: 'Tokens do not match' });
    }

    const tokens = await createTokens(user);

    const userWithTokens = { user: { ...user.toObject(), password: undefined }, tokens };

    res.status(200).json(userWithTokens);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};


const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    // Generate a unique verification code/token
    const verificationCode = uuidv4();

    // Save the verification code/token and the email address in a verification collection/table
    await Verification.create({ email, code: verificationCode });

    // Send a verification email to the user's email address with a link containing the verification code/token
    const verificationLink = `${process.env.BASE_URL}/verify-email/${verificationCode}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(200).json({
      message: "A verification email has been sent to your email address",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Verify Email Controller
const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.params;

    // Find the verification object associated with the code
    const verification = await Verification.findOne({ code: verificationCode });

    if (!verification) {
      throw new Error("Invalid verification code");
    }

    // Update the user's isVerified field to true
    const user = await User.findOneAndUpdate(
      { email: verification.email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    // Delete the verification object
    await Verification.findOneAndDelete({ code: verificationCode });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const resetPassword = async (req, res) => {
    const { password } = req.body;
    const resetToken = req.params.resetToken;
    
    try {
      if (!resetToken || !password) {
        throw new Error("All fields are required");
      }
    
      const user = await User.findOne({ resetToken });
      if (!user) {
        throw new Error("Invalid reset token");
      }
    
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
    
      user.password = hash;
      user.resetToken = undefined;
      await user.save();
    
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const resetToken = uuidv4();
  
      user.resetToken = resetToken;
      await user.save();
  
      const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;
      await sendResetPasswordEmail(email, resetLink);
  
      res.status(200).json({
        message: "A password reset email has been sent to your email address",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while trying to forget password" });
    }
  };
  

const changePassword = async (req, res) => {
try {
    // Get user ID from token in Authorization header
    const userId = req.user._id;

    // Check if old and new passwords are present
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
    throw new Error("All fields are required");
    }

    // Check if new password is strong enough
    if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Password not strong enough");
    }

    // Find user by ID and verify old password
    const user = await User.findById(userId).select("+password");
    if (!user) {
    throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
    throw new Error("Old password is incorrect");
    }

    // Update user with new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
} catch (error) {
    res.status(400).json({ error: error.message });
}
};


module.exports = {loginUser, refreshTokens, registerUser, verifyEmail, resetPassword, forgotPassword, changePassword}
