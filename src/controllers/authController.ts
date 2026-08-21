import { Request, Response } from "express";
import { AuthError, loginStudent, registerStudent } from "../service/authServices.ts";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email et mot de passe requis" });
      return;
    }

    const result = await loginStudent({ email, password });
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(err.status).json({ message: err.message });
      return;
    }

    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (!id || !name || !email || !password) {
      res.status(400).json({
        message: "id, name, email et password sont requis"
      });
      return;
    }

    const result = await registerStudent({
      id: Number(id),
      name,
      email,
      password
    });

    res.status(201).json(result);
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(err.status).json({ message: err.message });
      return;
    }

    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
