import express from "express";
import "dotenv/config";
const PORT = process.env.PORT || 4000;

import mongoose from "mongoose";

import newReflection from "./routes/api/newReflection.js";
import getReflections from "./routes/api/getReflections.js";
import dislikeReflection from "./routes/api/dislikeReflection.js";
import likeReflection from "./routes/api/likeReflection.js";

// Conecto localmente a la db (en remoto solo esta autorizada la ip de mi pc)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

const app = express();

app.use(express.json());

// Routes
app.use("/api", newReflection);
app.use("/api", getReflections);
app.put(`/api/:reflectionId/like`, likeReflection);
app.put(`/api/:reflectionId/dislike`, dislikeReflection);

app.listen(5000, () => console.log("Server started"));
