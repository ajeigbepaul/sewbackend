const router = require("express").Router();
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const User = require("../model/user");
// Use dynamic import for crypto-random-string
// const cryptoRandomStringPromise = import("crypto-random-string");
const sendVerificationEmail = async (email) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pdave4krist@gmail.com",
        pass: "avkifrdjfecmxkwx",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "sewit.com",
      to: email,
      subject: "SEWIT",
      text: `Thank you for your patronage. Kindly leave us a review as it helps us serve you better`,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("Error sending Email", error);
    }
  };
  
// POST REQUEST
router.post("/", async (req, res) => {
  try {
    const { fullname, email, password, } = req.body;
    // check if user already exists
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({ fullname, email, password: hashPassword });
    // save the user
    await newUser.save();
    // send a verification email to the user
    sendVerificationEmail(newUser.email);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router