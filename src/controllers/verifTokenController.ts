import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import History, { IHistory } from '../models/history';

export const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.replace('Bearer', '').trim();
  const decodedToken = jwt.verify(token, process.env.SECRET_CODE_TOKEN);

  try {
    const userToken = await checkToken(token, decodedToken);
    await checkLimit(res, userToken, req.body.text);
    next();
  } catch (e) {
    res.status(401).json({ 'error': 'You are not authenticated' });
  }
};

const checkToken = async (token: string, decodedToken: string | jwt.JwtPayload) => {
  const userToken = await User.findOne({ email: decodedToken, 'token': token });

  if (!userToken) throw new Error();

  return userToken;
};

const checkLimit = async (res: Response, userToken: IUser, text: string) => {
  try {
    const id_user = userToken._id.toString();
    const userHistory = await History.findOne({ id_user, date: getDate() });

    if (!userHistory) {
      const date = getDate();

      const newHistory: IHistory = new History({
        id_user,
        date,
        words: 0,
      });

      const savedHistory = await newHistory.save();
    }

    const newUserHistory = await History.findOne({ id_user, date: getDate() });
    const canUpdateWords = await checkWords(text, newUserHistory.words);
    if (canUpdateWords) {
      const newWords = newUserHistory.words + text.split(' ').length;
      const updateWords = await History.findOneAndUpdate(
        { id_user, date: getDate() },
        { words: newWords }
      );
    } else {
      res.status(402).json({ 'error': 'Payment Required' });
    }

  } catch (error) {
    throw error;
  }
};

const getDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const checkWords = async (text: string, userHistory: number) => {
  try {
    if (userHistory + text.split(' ').length > 80000) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    throw err;
  }
};