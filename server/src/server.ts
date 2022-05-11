import express, { Request, Response } from 'express';

const app = express();

app.get('/users', (request: Request, response: Response) => response.status(200).json({ message: "resposta" }));

app.listen(3333, () => {
  console.log(`Server is running!`);
});