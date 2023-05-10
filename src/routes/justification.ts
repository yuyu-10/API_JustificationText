import { Request, Response } from 'express';

const justificationText = (req: Request, res: Response): void => {
  const { text } = req.body;
  res.json(text.length)
};

module.exports = {
    justificationText
};
