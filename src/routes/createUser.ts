import User, { IUser } from '../models/user';
import { Request, Response } from 'express';
import { generateToken } from '../controllers/createTokenController';


export const createUser = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    try {
      // Vérifier si un utilisateur avec cet email existe déjà
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // Si un utilisateur avec cet email existe déjà, renvoyer son token
        res.status(200).json({ token: existingUser.token });
      } else {
        // Sinon, créer un nouvel utilisateur avec un nouveau token
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
  

