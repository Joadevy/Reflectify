import express from "express";

import { handleLikeReflection } from "../../controllers/reflectionController.js";
const router = express.Router();

router.route("/api/:reflectionId/like").put(handleLikeReflection);

export default router;
