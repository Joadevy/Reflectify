import express from "express";

import {
  getAllReflections,
  handleDislikeReflection,
  handleLikeReflection,
  createNewReflection,
} from "../controllers/reflectionController.js";
import VerifyJWt from "../middlewares/VerifyJWT.js";
export const indexRouter = express.Router();

// falta agregar el middleware VerifyJWT cuando implemente el login en el frontend
indexRouter.get("/", VerifyJWt, getAllReflections);
indexRouter.post("/", VerifyJWt, createNewReflection);
indexRouter.patch("/:reflectionId/dislike", VerifyJWt, handleDislikeReflection);
indexRouter.patch("/:reflectionId/like", VerifyJWt, handleLikeReflection);
