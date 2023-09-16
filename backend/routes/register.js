import { Router } from "express";

import { UserController } from "../controllers/userController.js";

export const createRegisterRouter = ({ userModel }) => {
  const userController = new UserController({ userModel });
  const registerRouter = Router();

  registerRouter.post("/", userController.create);

  return registerRouter;
};
