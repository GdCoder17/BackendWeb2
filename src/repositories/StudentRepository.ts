import connexion from "../config/database.ts";
import { Student } from "../models/Student.ts";



export const createStudent = async (student: Student) => {

  const insertQuery =
    'INSERT INTO "demoTable" (name, id) VALUES ($1, $2)';

  const result = await connexion.query(
    insertQuery,
    [student.name, student.id]
  );

  return result;
};



export const getAllStudents = async () => {

  const selectQuery =
    'SELECT * FROM "demoTable"';

  const result = await connexion.query(selectQuery);

  return result.rows;
};



export const updateStudent = async (
  id: number,
  name: string
) => {

  const updateQuery =
    'UPDATE "demoTable" SET name = $1 WHERE id = $2';

  const result = await connexion.query(
    updateQuery,
    [name, id]
  );

  return result;
};



export const deleteStudent = async (
  id: number
) => {

  const deleteQuery =
    'DELETE FROM "demoTable" WHERE id = $1';

  const result = await connexion.query(
    deleteQuery,
    [id]
  );

  return result;
};