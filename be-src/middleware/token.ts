import parseBearerToken from "parse-bearer-token";
import { decodeToken } from "../lib";

const authMiddleware = (req, res, next) => {
  try {
    const token = parseBearerToken(req);

    if (!token) throw "No hay token";

    req._userId = decodeToken(token);
    return next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

export { authMiddleware };
