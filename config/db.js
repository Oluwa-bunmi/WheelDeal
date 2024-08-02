const { configDotenv } = require("dotenv");
const mongoose = require("mongoose");
configDotenv()

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("database connection established");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
