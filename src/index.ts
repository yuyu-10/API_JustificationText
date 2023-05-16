import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err: Error) => {
  console.log(err);
});

import { handleJustifyRequest } from './routes/justifyRoute';
import { createUser } from './routes/createUserRoute';
import { tokenMiddleware } from './controllers/verifTokenController';

const app: Application = express();
const port: string | number = process.env.PORT || 3000;

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route principale
app.get('/', (req: Request,res: Response) => {
  res.send('Hello World!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Route pour justifier un texte
app.post('/api/justify', tokenMiddleware, handleJustifyRequest);

//Route pour l'authentification par email et token
app.post('/api/token', createUser);

