import express from "express";

import HandleNewUser from "../controllers/registerController.js";

export const registerRouter = express.Router();

registerRouter.post("/", HandleNewUser);
