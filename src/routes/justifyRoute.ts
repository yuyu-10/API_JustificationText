import{ Request, Response } from 'express';
import { justifyText } from '../controllers/justifyController';

export const handleJustifyRequest = (req: Request, res: Response) => {
  const justify: string = justifyText(req.body.text);
  res.setHeader('content-type', 'text/plain');
  res.send(justify);
};