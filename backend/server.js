import express from "express";
const app = express();

import "dotenv/config";
const PORT = process.env.PORT || 4000;

import cors from "cors";

import connectDB from "./config/connectDB.js";
import credentials from "./middlewares/credentials.js";
import corsOptions from "./config/corsOptions.js";
import { indexRouter } from "./routes/index.js";
import { loginRouter } from "./routes/login.js";
import { registerRouter } from "./routes/register.js";

connectDB();

app.use(credentials);
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

// Routes
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use("*", (req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.listen(PORT, () => console.log("Server started"));
