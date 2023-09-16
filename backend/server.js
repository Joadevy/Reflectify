import express from "express";
const app = express();

import "dotenv/config";
const PORT = process.env.PORT || 4000;

import connectDB from "./config/connectDB.js";
import credentials from "./middlewares/credentials.js";
import { createIndexRouter } from "./routes/index.js";
import { ReflectionModel } from "./models/Reflection.js";
import { UserModel } from "./models/User.js";
import { createLoginRouter } from "./routes/login.js";
import { createRegisterRouter } from "./routes/register.js";
import { corsMiddleware } from "./middlewares/cors.js";

connectDB();

app.use(credentials);
app.use(corsMiddleware());
app.use(express.json());

// Routes
app.use("/", createIndexRouter({ ReflectionModel }));
app.use("/register", createRegisterRouter({ UserModel }));
app.use("/login", createLoginRouter({ UserModel }));

app.use("*", (req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.listen(PORT, () => console.log("Server started"));
