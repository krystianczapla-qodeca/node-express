import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { CustomError } from '../interfaces/error';

export interface ExtendedRequest extends Request {
  userId?: string;
}

export default (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error: CustomError = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }

  if (!decodedToken) {
    const error: CustomError = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  // req.userId = decodedToken.userId;
  req.userId = (decodedToken as { userId: string }).userId;
  next();
};
