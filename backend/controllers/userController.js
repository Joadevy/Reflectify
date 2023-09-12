import crypto from "node:crypto";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/User.js";
import { validateUser } from "../models/ZodSchemas/User.js";

export class userController {
  static login = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(400).json({
          ok: false,
          message: "Missing required fields",
        });

      const user = await UserModel.findByUsername({ username });

      if (!user)
        return res.status(400).json({
          ok: false,
          message: "Username does not exist",
        });

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword)
        return res
          .status(404)
          .json({ ok: false, message: "Incorrect password" });

      const payload = {
        username: user.username,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
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

  static create = async (req, res) => {
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

      const existUser = await UserModel.exists({ username });

      if (existUser)
        return res.status(400).json({
          ok: false,
          message: "Username already exists",
        });

      const user = await UserModel.create({
        data: {
          id: crypto.randomBytes(16).toString("hex"),
          username,
          password: hashedPassword,
          country,
          registration_date: new Date(),
        },
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
}
