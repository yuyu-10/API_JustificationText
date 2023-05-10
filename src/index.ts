import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
const justification = require('./routes/justification');

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.post('/api/justify', justification.justificationText);