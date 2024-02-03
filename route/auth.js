const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    const checkPassword = bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const roles = Object.values(user.roles).filter(Boolean);
    // Generate token
    const token = jwt.sign(
      { userId: user?._id, roles: roles, email: user?.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600s" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
