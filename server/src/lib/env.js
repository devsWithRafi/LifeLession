import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 8000,
  CLIENT_URL: process.env.CLIENT_URL,
  MONGODB_URI: process.env.MONGODB_URI,
};
