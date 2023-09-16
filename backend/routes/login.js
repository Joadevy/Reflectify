import { Router } from "express";

import { UserController } from "../controllers/userController.js";

export const createLoginRouter = ({ userModel }) => {
  const loginRouter = Router();
  const userController = new UserController({ userModel });

  loginRouter.post("/", userController.login);

  return loginRouter;
};
