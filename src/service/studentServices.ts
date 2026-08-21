import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
} from "../repositories/studentRepository.ts";

import { Student } from "../models/student.ts";


// Ajouter un étudiant
export const addStudent = async (
  student: Student
) => {

  return await createStudent(student);
};


// Récupérer tous les étudiants
export const getStudents = async () => {

  return await getAllStudents();
};


// Modifier un étudiant
export const modifyStudent = async (
  id: number,
  name: string
) => {

  return await updateStudent(id, name);
};


// Supprimer un étudiant
export const removeStudent = async (
  id: number
) => {

  return await deleteStudent(id);
};