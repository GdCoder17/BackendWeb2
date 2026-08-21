import { Router } from "express";
import {
  loginController,
  registerController
} from "../controllers/authController.ts";

const router = Router();

router.post("/auth/login", loginController);
router.post("/auth/register", registerController);

export default router;
