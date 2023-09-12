import express from "express";

import { ReflectionController } from "../controllers/reflectionController.js";
import VerifyJWt from "../middlewares/VerifyJWT.js";
export const indexRouter = express.Router();

// falta agregar el middleware VerifyJWT cuando implemente el login en el frontend
indexRouter.get("/", VerifyJWt, ReflectionController.getAll);
indexRouter.post("/", VerifyJWt, ReflectionController.create);
indexRouter.patch("/:reflectionId/like", VerifyJWt, ReflectionController.like);
indexRouter.patch(
  "/:reflectionId/dislike",
  VerifyJWt,
  ReflectionController.dislike,
);
