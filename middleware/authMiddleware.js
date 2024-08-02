const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

const adminOnly = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { auth, adminOnly };
