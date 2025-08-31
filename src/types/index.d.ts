import { JwtPayload } from 'jsonwebtoken';
import 'express';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
