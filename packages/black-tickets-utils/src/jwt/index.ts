import * as jwt from 'jsonwebtoken';

const jwtKey: string = process.env.JWT_KEY || '';

export function generateToken(user: {id: string; email: string}) {
  return jwt.sign(user, jwtKey);
}

export function verify(token: string) {
  return jwt.verify(token, jwtKey);
}
