import express from "express";
import cors from "cors";
import StudentRoutes from "./routes/StudentRoutes.ts";

const app = express();

const port: number = 3000;

app.use(cors());
app.use(express.json());

app.use("/", StudentRoutes);

app.listen(port, () => {
  console.log("Serveur est lancé");
});