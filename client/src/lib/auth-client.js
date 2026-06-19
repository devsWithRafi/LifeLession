import { createAuthClient } from 'better-auth/react';
import { jwtClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [jwtClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;

export const getToken = async () => {
  const { data, error } = await authClient.token();
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const jwtToken = data.token;
    return jwtToken;
  }
};
