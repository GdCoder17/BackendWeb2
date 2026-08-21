import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  updateStudentController,
  deleteStudentController
} from "../controllers/studentController.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";


const router = Router();


router.post(
  "/etudiants",
  authMiddleware,
  createStudent
);


router.get(
  "/etudiants",
  authMiddleware,
  getAllStudents
);


router.put(
  "/etudiants/:id",
  authMiddleware,
  updateStudentController
);


router.delete(
  "/etudiants/:id",
  authMiddleware,
  deleteStudentController
);


export default router;
