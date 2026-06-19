import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addNewLesson } from '../controllers/lesson/addNewLesson.controller.js';

const lessonsRouter = Router();

lessonsRouter.post('/create', authMiddlewere, addNewLesson);

export default lessonsRouter;