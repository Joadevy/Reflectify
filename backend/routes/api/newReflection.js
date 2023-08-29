import express from "express";

import { createNewReflection } from "../../controllers/reflectionController.js";
const router = express.Router();

router.post("/", createNewReflection);

export default router;
