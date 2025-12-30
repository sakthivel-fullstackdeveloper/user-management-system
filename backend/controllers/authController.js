const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    if (!Name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      Name,
      email,
      password: hashedPassword,
      role: "user",         
      status: "active"
    });

    
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        Name: user.Name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { signup };
