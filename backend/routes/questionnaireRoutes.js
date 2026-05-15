import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { getQuestionsByLevel , submitAnswers } from '../controllers/questionnaireController.js'
const router = express.Router()

router.get('/:level',authMiddleware, getQuestionsByLevel);
router.post('/submit/:level', authMiddleware, submitAnswers);

export default router;