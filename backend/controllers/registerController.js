import crypto from "crypto";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { validateUser } from "../models/ZodSchemas/User.js";

const HandleNewUser = async (req, res) => {
  try {
    const userValidated = validateUser(req.body);

    if (!userValidated.success)
      return res.status(400).json({
        ok: false,
        message: userValidated.error.message,
      });

    const { username, password, country } = userValidated.data;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existUser = await User.exists({ username });

    if (existUser)
      return res.status(400).json({
        ok: false,
        message: "Username already exists",
      });

    const user = await User.create({
      id: crypto.randomBytes(16).toString("hex"),
      username,
      password: hashedPassword,
      country,
      registration_date: new Date(),
    });

    const payload = {
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      ok: true,
      message: "User created successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error creating user" });
  }
};

export default HandleNewUser;
