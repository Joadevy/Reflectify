import express from "express";

import { ReflectionController } from "../controllers/reflectionController.js";
import VerifyJWt from "../middlewares/VerifyJWT.js";
export const indexRouter = express.Router();

indexRouter.get("/", VerifyJWt, ReflectionController.getLast20);
indexRouter.get(
  "/:page/:limit",
  VerifyJWt,
  ReflectionController.getPageWithLimit,
);
indexRouter.post("/", VerifyJWt, ReflectionController.create);
indexRouter.patch("/:reflectionId/like", VerifyJWt, ReflectionController.like);
indexRouter.patch(
  "/:reflectionId/dislike",
  VerifyJWt,
  ReflectionController.dislike,
);
