const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const userRouter = require("./route/register");
const authRouter = require("./route/auth");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "sowit",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(
  express.json({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
// Routes
app.get("/", (req, res) => {
  res.json({ message: "connected well and working" });
});
app.use("/register", userRouter);
app.use("/auth", authRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
