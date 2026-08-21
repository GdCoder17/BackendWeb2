import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  updateStudentController,
  deleteStudentController
} from "../controllers/studentController.ts";


const router = Router();


router.post(
  "/etudiants",
  createStudent
);


router.get(
  "/etudiants",
  getAllStudents
);


router.put(
  "/etudiants/:id",
  updateStudentController
);


router.delete(
  "/etudiants/:id",
  deleteStudentController
);


export default router;