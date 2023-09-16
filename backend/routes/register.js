import { Router } from "express";

import { UserController } from "../controllers/userController.js";

export const createRegisterRouter = ({ UserModel }) => {
  const userController = new UserController({ UserModel });
  const registerRouter = Router();

  registerRouter.post("/", userController.create);

  return registerRouter;
};
