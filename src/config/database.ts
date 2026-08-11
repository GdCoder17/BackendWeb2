import { Pool } from 'pg';

const connexion = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "police",
  database: "demoPost"
});

connexion
  .connect()
  .then(() => {
    console.log("Votre connexion à la base de données demoPost est établie");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });

export default connexion;