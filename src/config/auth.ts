import jwt, { type SignOptions } from "jsonwebtoken";
import type { AuthTokenPayload } from "../models/auth.ts";

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET est manquant dans le fichier .env");
  }

  return secret;
};

export const getJwtExpiresIn = (): NonNullable<SignOptions["expiresIn"]> => {
  return (process.env.JWT_EXPIRES_IN || "1h") as NonNullable<SignOptions["expiresIn"]>;
};

export const signAuthToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn()
  });
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded === "string") {
    throw new Error("Token JWT invalide");
  }

  const studentId = Number(decoded.studentId);
  const email = decoded.email;

  if (!studentId || typeof email !== "string") {
    throw new Error("Payload JWT invalide");
  }

  return {
    studentId,
    email
  };
};
