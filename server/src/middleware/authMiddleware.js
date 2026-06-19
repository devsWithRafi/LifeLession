import { env } from '../lib/env.js';
import { jwtVerify, createRemoteJWKSet } from 'jose';

async function validateToken(token) {
  try {
    const JWKS = createRemoteJWKSet(new URL(`${env.CLIENT_URL}/api/auth/jwks`));

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: env.CLIENT_URL,
    });
    return payload;
  } catch (error) {
    console.error('Token validation failed:', error);
    throw error;
  }
}

export const authMiddlewere = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await validateToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};
