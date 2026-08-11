import { Request, Response } from "express";

import {
  addStudent,
  getStudents,
  modifyStudent,
  removeStudent
} from "../service/StudentServices.ts";


// POST /etudiants
export const createStudent = async (
  req: Request,
  res: Response
) => {

  try {

    const { name, id } = req.body;

    await addStudent({
      name,
      id
    });

    res.status(201).send(
      `L'étudiant ${name} a été ajouté avec succès à la base de données.`
    );

  } catch (err) {

    console.error(err);

    res.status(500).send(err);
  }
};


// GET /etudiants
export const getAllStudents = async (
  req: Request,
  res: Response
) => {

  try {

    const students = await getStudents();

    res.status(200).json(students);

  } catch (err) {

    console.error(err);

    res.status(500).send(err);
  }
};


// PUT /etudiants/:id
export const updateStudentController = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;
    const { name } = req.body;

    await modifyStudent(
      Number(id),
      name
    );

    res.status(200).send(
      `L'étudiant ${name} a été mis à jour avec succès à la base de données.`
    );

  } catch (err) {

    console.error(err);

    res.status(500).send(err);
  }
};


// DELETE /etudiants/:id
export const deleteStudentController = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    await removeStudent(Number(id));

    res.status(200).send(
      `L'étudiant avec l'id ${id} a été supprimé avec succès à la base de données.`
    );

  } catch (err) {

    console.error(err);

    res.status(500).send(err);
  }
};