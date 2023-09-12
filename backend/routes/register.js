import express from "express";

import { userController } from "../controllers/userController.js";

export const registerRouter = express.Router();

registerRouter.post("/", userController.create);
