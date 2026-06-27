import express from 'express';
import dotenv from 'dotenv';
import { env } from './lib/env.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
import lessonsRouter from './routes/lessonsRoute.js';
import commentRouter from './routes/commentRoute.js';
import likeRouter from './routes/likeRoute.js';
import savedRouter from './routes/savedRoute.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import reportRoute from './routes/reportRoute.js';

dotenv.config();

const app = express();

await connectDB();

app.use(express.json());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'Server is OK' });
});

app.use('/api/lesson', lessonsRouter);
app.use('/api/comment', commentRouter);
app.use('/api/like', likeRouter);
app.use('/api/save', savedRouter);
app.use('/api/report', reportRoute);  
app.use('/api/me', userRouter);
app.use('/api/admin', adminRouter);

app.listen(env.PORT, () => {
  console.log('Server is running', env.PORT);
});

export default app;