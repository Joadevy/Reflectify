import bcrypt from "bcrypt";

import User from "../models/User.js";

const HandleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      ok: false,
      message: "Missing required fields",
    });

  // ... TO DO :)
};
