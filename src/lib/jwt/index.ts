import * as jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const generateToken = (userId: number): string => {
  // * JWT: Generates token
  return jwt.sign({ userId }, JWT_SECRET);
};

const decodeToken = (token: string): number => {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    return userId;
  } catch (err) {
    throw "Token incorrecto";
  }
};

export { decodeToken, generateToken };
