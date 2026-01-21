import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// LOGIC: Helper function to create the Token
const createToken = (id) => {
  return jwt.sign({ user: { id } }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// 1. REGISTER LOGIC
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Logic: Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create new user (Password hashing happens automatically in Model Step 13)
    user = new User({ name, email, password });
    await user.save();

    const token = createToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. LOGIN LOGIC
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // Logic: Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = createToken(user._id);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};