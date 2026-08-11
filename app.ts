// import express, { Request, Response } from 'express';
// import { Pool } from 'pg';
// const app = express();
// const port: number = 3000;




// const connexion =  new Pool({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "police",
//   database: "demoPost"
// })

// connexion
// .connect()
// .then(() => console.log(`Votre connexion à la base de données ${"demoPost"} est établie`))
// .catch((err) => console.error(err));

// app.use(express.json());

// app.post('/etudiants', (req: Request, res: Response) => {
//   const { name, id } = req.body;
//   const insert_query = 'INSERT INTO "demoTable" (name, id) VALUES ($1, $2)';
//   connexion.query(insert_query, [name, id], (err, result) => {
//     try {
//       if (err) {
//         res.send(err);
//       } else {  
        
//         res.send(`L'étudiant ${name} a été ajouté avec succès à la base de données.`);  
//       }
//     } catch (err) {
//       res.send(err);
//     }
//   });
// });

// app.get('/etudiants', (req: Request, res: Response) => {
//   const select_query = 'SELECT * FROM "demoTable"'
//   connexion.query(select_query, (err, result) => {
//     if(err) {
//       res.send(err)
//     } else {
//       console.log(result)
//       res.send(result.rows)
//     }
//   })
// })

// app.put('/etudiants/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const update_query = 'UPDATE "demoTable" SET name = $1 WHERE id = $2';
//   connexion.query(update_query, [name, id], (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(`L'étudiant ${name} a été mis à jour avec succès à la base de données.`);
//     }
//   });
// });

// app.delete('/etudiants/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const delete_query = 'DELETE FROM "demoTable" WHERE id = $1';
//   connexion.query(delete_query, [id], (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(`L'étudiant avec l'id ${id} a été supprimé avec succès à la base de données.`);
//     }
//   });
// });



// app.listen(port, () => {
//   console.log(`Serveur est lancé`);
// });
