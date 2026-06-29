import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addReport } from '../controllers/report/addReport.controller.js';
import { deleteLessonsReports } from '../controllers/report/deleteLessonsReports.js';

const reportRoute = Router();

reportRoute.post('/add', authMiddlewere, addReport);
reportRoute.delete('/delete/:lessonId', authMiddlewere, deleteLessonsReports);

export default reportRoute;
