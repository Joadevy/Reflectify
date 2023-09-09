import express from "express";

import { handleLikeReflection } from "../../controllers/reflectionController.js";
import VerifyJWt from "../../middlewares/VerifyJWT.js";
const router = express.Router();

router.patch("/:reflectionId/like", VerifyJWt, handleLikeReflection);

export default router;
