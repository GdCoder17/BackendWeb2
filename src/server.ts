import express from "express";
import StudentRoutes from "./routes/StudentRoutes.ts";

const app = express();

const port: number = 3000;

app.use(express.json());

app.use("/", StudentRoutes);

app.listen(port, () => {
  console.log("Serveur est lancé");
});