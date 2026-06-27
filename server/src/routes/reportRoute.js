import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addReport } from '../controllers/report/addReport.controller.js';

const reportRoute = Router();

reportRoute.post('/add', authMiddlewere, addReport);

export default reportRoute;
