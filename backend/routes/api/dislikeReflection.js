import express from "express";

import { handleDislikeReflection } from "../../controllers/reflectionController.js";
import VerifyJWt from "../../middlewares/VerifyJWT.js";
const router = express.Router();

router.patch("/:reflectionId/dislike", VerifyJWt, handleDislikeReflection);

export default router;
