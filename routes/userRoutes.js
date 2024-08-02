const express = require("express");
const route = express.Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/authController");
const { auth, adminOnly } = require("../middleware/authMiddleware");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/get-users", auth, adminOnly, getUsers);

// Google OAuth Authentication
route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
// Google OAuth Callback
route.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // User is now authenticated and available as req.user
    const user = req.user;

    const expiresIn = process.env.EXPIRES_IN;

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

    // Create user info object
    const userInfo = {
      id: user.id,
      username: user.username,
      role: user.role,
      access_token: token,
      status: "success",
      message: "User logged in successfully",
    };

    // Send user info as response
    return res.status(200).json({ userInfo });
  }
);

module.exports = route;
