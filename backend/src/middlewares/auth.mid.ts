import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { HTTP_UNAUTHORIZED } from '../constants/http_status';

export const auth: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(HTTP_UNAUTHORIZED).json({ message: 'Token mancante' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedUser = verify(token, process.env.JWT_SECRET || 'fallback-secret');
    (req as any).user = decodedUser;
    next();
  } catch (error) {
    console.log('Token non valido ricevuto:', token);
    res.status(HTTP_UNAUTHORIZED).json({ message: 'Token non valido' });
  }
};
