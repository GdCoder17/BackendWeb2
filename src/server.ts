import express from "express";
import cors from "cors";
import StudentRoutes from "./routes/studentRoutes.ts";

const app = express();

const port: number = 3000;

app.use(cors()); //ceci est un middleware qui permet de faire des requêtes cross-domain
app.use(express.json()); //ceci est un middleware qui permet de faire des requêtes json | il transforme les données en json

app.use("/", StudentRoutes);

app.listen(port, () => {
  console.log("Serveur est lancé");
});