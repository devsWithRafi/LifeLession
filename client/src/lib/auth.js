import { betterAuth } from 'better-auth';
import { jwt } from 'better-auth/plugins';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { db } from './db';

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: String,
        defaultValue: 'user',
        input: false,
        required: false,
      },
    },
  },

  plugins: [jwt()],
});
