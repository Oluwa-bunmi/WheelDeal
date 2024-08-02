const { configDotenv } = require("dotenv");
const app = require("./app");
const db = require("./config/db");
const authRoutes = require("./routes/userRoutes");
const passportSetup = require("./config/passport");
configDotenv();

const port = process.env.PORT || 5000;

db();
app.use("/api/v1/auth/", authRoutes);
app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
