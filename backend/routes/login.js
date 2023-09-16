import { Router } from "express";

import { UserController } from "../controllers/userController.js";

export const createLoginRouter = ({ UserModel }) => {
  const loginRouter = Router();
  const userController = new UserController({ UserModel });

  loginRouter.post("/", userController.login);

  return loginRouter;
};
