import express from "express";

import HandleLogin from "../controllers/authController.js";

export const loginRouter = express.Router();

loginRouter.post("/", HandleLogin);
