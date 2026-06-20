import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addNewLesson } from '../controllers/lesson/addNewLesson.controller.js';
import { getAllLessons } from '../controllers/lesson/getAllLessons.controller.js';
import { getFeaturedLessons } from '../controllers/lesson/getFeaturedLessons.controller.js';

const lessonsRouter = Router();

lessonsRouter.post('/create', authMiddlewere, addNewLesson);
lessonsRouter.get('/all', getAllLessons);
lessonsRouter.get('/featured', getFeaturedLessons);

export default lessonsRouter;
