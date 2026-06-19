import express from 'express';
import dotenv from 'dotenv';
import { env } from './lib/env.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
import lessonsRouter from './routes/lessonsRoute.js';

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

app.use('/api/lesson', lessonsRouter)

app.listen(env.PORT, () => {
  console.log('Server is running', env.PORT);
});
