const mongoose = require('mongoose')
const User = require("../models/authModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const Verification = require("../models/verificationModel")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail, sendResetPasswordEmail } = require("../services/email.js");

require("dotenv").config()

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: "1d"})
}

const loginUser = async(req, res) => {
    const {email, password} = req.body

    try {

        if(!email || !password) {
            throw Error("All fields are required")
        }
    
        if(!validator.isEmail(email)) {
            throw Error("Email is not valid")
        }
        

        const user = await User.findOne({email})

        if (!user) {
            throw Error("Incorrect Email")
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match) {
            throw Error("Incorrect Password")
        }

        if (!user.isVerified) {
            throw Error("Email not verified. Please check your email and click on the verification link to verify your account.")
        }

        const token = createToken({
            _id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.SECRET_KEY,
          {expiresIn:"3d"}
          )


        res.status(200).json({user, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const registerUser = async(req, res) => {
    const {firstName, lastName, email, password} = req.body

    try {

        if(!firstName || !lastName || !email || !password) {
            throw Error("All fields are required")
        }
    
        if(!validator.isEmail(email)) {
            throw Error("Email is not valid")
        }
    
        if(!validator.isStrongPassword(password)) {
            throw Error("Password not strong Enough")
        }


        const exists = await User.findOne({email})
        if (exists) {
            throw Error("User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = await User.create({firstName, lastName, email, password: hash})

        // Generate a unique verification code/token
        const verificationCode = uuidv4();

        // Save the verification code/token and the email address in a verification collection/table
        await Verification.create({ email, code: verificationCode });

        // Send a verification email to the user's email address with a link containing the verification code/token
        const verificationLink = `${process.env.BASE_URL}/verify/${verificationCode}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(200).json({
          message: "A verification email has been sent to your email address",
        });

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Verify Email Controller
const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.params;

    // Find the verification object associated with the code
    const verification = await Verification.findOne({ code: verificationCode });

    if (!verification) {
      throw Error("Invalid verification code");
    }

    // Update the user's isVerified field to true
    const user = await User.findOneAndUpdate(
      { email: verification.email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      throw Error("User not found");
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
        throw Error("All fields are required");
      }
    
      const user = await User.findOne({ resetToken });
      if (!user) {
        throw Error("Invalid reset token");
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
        throw Error("Email is required");
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        throw Error("User not found");
      }
  
      const resetToken = uuidv4();
  
      user.resetToken = resetToken;
      await user.save();
  
      const resetLink = `${process.env.BASE_URL}/reset/${resetToken}`;
      await sendResetPasswordEmail(email, resetLink);
  
      res.status(200).json({
        message: "A password reset email has been sent to your email address",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
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


module.exports = {loginUser, registerUser, verifyEmail, resetPassword, forgotPassword, changePassword}
