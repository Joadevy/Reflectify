import express from "express";

import HandleNewUser from "../../controllers/registerController.js";

const router = express.Router();

router.post("/register", HandleNewUser);

export default router;
