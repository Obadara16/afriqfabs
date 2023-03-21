const User = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validator = require("validator")



// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { password, ...updateFields } = req.body;
//   if (password) {
//     const salt = await bcrypt.genSalt(10);
//     updateFields.password = await bcrypt.hash(password, salt);
//   }
//   try {
//     const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
//       new: true,
//     });
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

 // Helper function to get the user ID and verify token from the authorization header
 const getUserIdFromToken = (authHeader) => {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken._id;
};



const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
        // Check if required fields are present
        if (!oldPassword || !newPassword) {
            throw Error("All fields are required");
        }
    
        // Check if new password is strong enough
        if (!validator.isStrongPassword(newPassword)) {
            throw Error("Password not strong enough");
        }
    
        // Get user ID from token in Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw Error("Authorization header not present");
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken._id;
    
        // Find user by ID
        const user = await User.findById(userId);
    
        // Check if user exists
        if (!user) {
            throw Error("User does not exist");
        }
    
        // Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw Error("Old password is incorrect");
        }
    
        // Hash new password and update user
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
    
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
  };

 

  const updateUser = async (req, res) => {
    const { lastName, firstName, gender, age,  img} = req.body;
  
    try {
      // Get the user ID from the authorization header
      const userId = getUserIdFromToken(req.headers.authorization);
      console.log(userId)
  
      // Find user by ID
      const user = await User.findById(userId);
  
      // Check if user exists
      if (!user) {
        throw Error("User does not exist");
      }
  
      // Update user information
      if (lastName) user.lastName = lastName;
      if (firstName) user.firstName = firstName;
      if (gender) user.gender = gender;
      if (age) user.age = age;
      if (img) user.img = img;
  
      await user.save();
  
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getUserStats,
  changePassword,
};
