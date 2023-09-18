import { Router } from "express";

import VerifyJWt from "../middlewares/VerifyJWT.js";
import { ReflectionController } from "../controllers/reflectionController.js";

export const createIndexRouter = ({ ReflectionModel }) => {
  const indexRouter = Router();
  const reflectionController = new ReflectionController({ ReflectionModel });

  indexRouter.get("/", VerifyJWt, reflectionController.getLast20);
  indexRouter.get(
    "/:page/:limit",
    VerifyJWt,
    reflectionController.getPageWithLimit,
  );
  indexRouter.post("/", VerifyJWt, reflectionController.create);
  indexRouter.patch(
    "/:reflectionId/like",
    VerifyJWt,
    reflectionController.like,
  );
  indexRouter.patch(
    "/:reflectionId/dislike",
    VerifyJWt,
    reflectionController.dislike,
  );
  indexRouter.delete("/:reflectionId", VerifyJWt, reflectionController.delete);

  return indexRouter;
};
