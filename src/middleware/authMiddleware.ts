import { NextFunction, Request, Response } from "express";
import { verifyAuthToken } from "../config/auth.ts";
import type { AuthTokenPayload } from "../models/auth.ts";

declare global {
  namespace Express {
    interface Request {
      student?: AuthTokenPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({ message: "Token manquant" });
    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Format du token invalide" });
    return;
  }

  try {
    req.student = verifyAuthToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
