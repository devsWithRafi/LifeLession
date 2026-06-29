import { betterAuth } from 'better-auth';
import { jwt } from 'better-auth/plugins';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { headers } from 'next/headers';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

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
      plan: {
        type: String,
        defaultValue: 'free',
        input: false,
        required: false,
      },
      bio: {
        type: String,
        defaultValue: 'Proud member of the LifeLesson community',
        input: true,
        required: false,
      },
    },
  },

  plugins: [jwt()],
});

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};
