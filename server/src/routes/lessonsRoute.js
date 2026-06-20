import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addNewLesson } from '../controllers/lesson/addNewLesson.controller.js';
import { getAllLessons } from '../controllers/lesson/getAllLessons.controller.js';
import { getFeaturedLessons } from '../controllers/lesson/getFeaturedLessons.controller.js';
import { getSingleLesson } from '../controllers/lesson/getSingleLesson.controller.js';

const lessonsRouter = Router();

lessonsRouter.post('/create', authMiddlewere, addNewLesson);
lessonsRouter.get('/all', getAllLessons);
lessonsRouter.get('/featured', getFeaturedLessons);
lessonsRouter.get('/:id', authMiddlewere, getSingleLesson);

export default lessonsRouter;
