import express from 'express';
import { getAllReflections } from '../../controllers/reflectionController.js';
const router = express.Router();

router.get('/', getAllReflections);

export default router;