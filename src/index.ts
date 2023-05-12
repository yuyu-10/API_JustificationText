import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { handleJustifyRequest } from './routes/justifyRoute';
import { createUser } from './routes/createUser';
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECT_DB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.log(err);
  });


const app: Application = express();
const port: number = 3000;

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route principale
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Route pour justifier un texte
app.post('/api/justify', handleJustifyRequest);

//Route pour créer un token via un email
app.post('/api/token', createUser);

