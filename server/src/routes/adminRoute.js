import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { getDashboardData } from '../controllers/admin/getDashboardData.controller.js';

const adminRouter = Router();

adminRouter.get('/states', authMiddlewere, getDashboardData);

export default adminRouter;
