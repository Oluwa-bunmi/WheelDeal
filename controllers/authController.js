const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, please sign up" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const expiresIn = process.env.EXPIRES_IN;

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

    const userInfo = {
      id: user.id,
      username: user.username,
      role: user.role,
      access_token: token,
      status: "success",
      message: "User Logged in successful",
    };

    return res.status(200).json({ userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot login" });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to retrieve users", error: err.message });
  }
};

module.exports = { registerUser, loginUser, getUsers };