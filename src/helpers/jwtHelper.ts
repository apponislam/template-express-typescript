import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

// const createToken = (payload: object, secret: Secret, expireTime: string) => {
//   return jwt.sign(payload, secret, { expiresIn: expireTime }) as SignOptions;
// };

type ExpiresIn = string | number;

export const createToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: ExpiresIn
): string => {
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: expiresIn as any,
  };

  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = { createToken, verifyToken };
