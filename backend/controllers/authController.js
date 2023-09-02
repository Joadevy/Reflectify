import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const HandleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        ok: false,
        message: "Missing required fields",
      });

    const user = await User.findOne({ username });

    if (!user)
      return res.status(400).json({
        ok: false,
        message: "Username does not exist",
      });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(404).json({ ok: false, message: "Incorrect password" });

    const payload = {
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      ok: true,
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error logging in user" });
  }
};

export default HandleLogin;
