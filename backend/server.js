import express from "express";
import "dotenv/config";
const PORT = process.env.PORT || 4000;

import cors from "cors";

import newReflection from "./routes/api/newReflection.js";
import getReflections from "./routes/api/getReflections.js";
import dislikeReflection from "./routes/api/dislikeReflection.js";
import likeReflection from "./routes/api/likeReflection.js";
import register from "./routes/api/register.js";
import login from "./routes/api/auth.js";
import credentials from "./middlewares/credentials.js";
import connectDB from "./config/connectDB.js";

connectDB();

const app = express();

app.use(credentials);
app.use(express.json());
app.use(cors());

// Routes
app.post("/", newReflection);
app.get("/", getReflections);
app.post("/register", register);
app.post("/login", login);
app.patch(`/:reflectionId/like`, likeReflection);
app.patch(`/:reflectionId/dislike`, dislikeReflection);

app.use("*", (req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.listen(PORT, () => console.log("Server started"));
