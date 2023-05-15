import User, { IUser } from '../models/user';
import { Request, Response } from 'express';
import { generateToken } from '../controllers/createTokenController';


export const createUser = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        res.status(200).json({ token: existingUser.token });
      } else {
        const token = generateToken(email);
        const limit: number = 80000;

        const newUser: IUser = new User({
          email,
          token,
          limit
        });
  
        const savedUser = await newUser.save();
        res.status(201).json({ token: savedUser.token });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Could not save user to database' });
    }
  };
  

