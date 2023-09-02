import { response, request } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const VerifyJWt = (req = request, res = response, next) => {
  try {
    const token = req.header("Authorization");

    if (!token)
      return res.status(401).json({
        ok: false,
        message: "Unauthorized",
      });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.username = decoded.username;
      next();
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error verifying token" });
  }
};

export default VerifyJWt;
