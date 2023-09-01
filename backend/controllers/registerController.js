import bcrypt from "bcrypt";

import User from "../models/User.js";

const HandleNewUser = async (req, res) => {
  try {
    const { username, password, country } = req.body;

    if (!username || !password || !country)
      return res.status(400).json({
        ok: false,
        message: "Missing required fields",
      });

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      country,
      registration_date: new Date(),
    });

    res.status(201).json({
      ok: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error creating user" });
  }
};

export default HandleNewUser;