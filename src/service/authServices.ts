import bcrypt from "bcryptjs";
import {
  createAuthenticatedStudent,
  findStudentByEmail
} from "../repositories/authRepository.ts";
import { signAuthToken } from "../config/auth.ts";
import type {
  AuthTokenResponse,
  LoginInput,
  RegisterInput
} from "../models/auth.ts";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const loginStudent = async (
  input: LoginInput
): Promise<AuthTokenResponse> => {
  const email = normalizeEmail(input.email);
  const student = await findStudentByEmail(email);

  if (!student || !student.passwordHash) {
    throw new AuthError("Identifiants incorrects", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    student.passwordHash
  );

  if (!isPasswordValid) {
    throw new AuthError("Identifiants incorrects", 401);
  }

  const token = signAuthToken({
    studentId: student.id,
    email: student.email as string
  });

  return { token };
};

export const registerStudent = async (
  input: RegisterInput
): Promise<AuthTokenResponse> => {
  const email = normalizeEmail(input.email);
  const existingStudent = await findStudentByEmail(email);

  if (existingStudent) {
    throw new AuthError("Cet email est déjà utilisé", 409);
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  try {
    await createAuthenticatedStudent({
      id: input.id,
      name: input.name.trim(),
      email,
      passwordHash
    });
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === "23505"
    ) {
      throw new AuthError("Cet identifiant ou cet email est déjà utilisé", 409);
    }

    throw err;
  }

  const token = signAuthToken({
    studentId: input.id,
    email
  });

  return { token };
};
