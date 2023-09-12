import express from "express";

import { userController } from "../controllers/userController.js";

export const loginRouter = express.Router();

loginRouter.post("/", userController.login);
