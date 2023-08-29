import express from "express";

import { handleDislikeReflection } from "../../controllers/reflectionController.js";
const router = express.Router();

router.route("/api/:reflectionId/dislike").put(handleDislikeReflection);

export default router;
