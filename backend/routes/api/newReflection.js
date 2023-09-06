import express from "express";

import { createNewReflection } from "../../controllers/reflectionController.js";
import VerifyJWt from "../../middlewares/VerifyJWT.js";
const router = express.Router();

router.post("/", VerifyJWt, createNewReflection);

export default router;
