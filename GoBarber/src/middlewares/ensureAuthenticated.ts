import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth'
import AppError from '../Erros/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {

  // Token Validation
  const authHeader = request.headers.authorization;

  if (!authHeader)
    throw new AppError('JWT token is missing.', 401);

  // Bearer *token* em duas partes
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    console.log(decoded);

    // Enforce
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
