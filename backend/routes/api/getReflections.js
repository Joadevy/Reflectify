import express from "express";

import { getAllReflections } from "../../controllers/reflectionController.js";
import VerifyJWt from "../../middlewares/VerifyJWT.js";
const router = express.Router();

// falta agregar el middleware VerifyJWT cuando implemente el login en el frontend
router.get("/", getAllReflections);

export default router;
