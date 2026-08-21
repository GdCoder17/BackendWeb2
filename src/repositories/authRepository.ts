import connexion from "../config/database.ts";
import type { StudentAuthRecord } from "../models/student.ts";

export const findStudentByEmail = async (
  email: string
): Promise<StudentAuthRecord | null> => {
  const selectQuery = `
    SELECT id, name, email, password_hash AS "passwordHash"
    FROM "demoTable"
    WHERE email = $1
  `;

  const result = await connexion.query(selectQuery, [email]);
  const student = result.rows[0] as StudentAuthRecord | undefined;

  return student ?? null;
};

export const createAuthenticatedStudent = async (
  student: StudentAuthRecord
) => {
  const insertQuery = `
    INSERT INTO "demoTable" (id, name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email
  `;

  const result = await connexion.query(insertQuery, [
    student.id,
    student.name,
    student.email,
    student.passwordHash
  ]);

  return result.rows[0];
};
