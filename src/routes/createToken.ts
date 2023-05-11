import { Request, Response } from 'express';
import { generateToken, tokenExistsForEmail, saveTokenForEmail } from '../controllers/createTokenController';


interface Payload {
    email: string;
}
  
export const handleCreateTokenRoute = (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'L\'email est requis.' });
    }

    if (tokenExistsForEmail(email)) {
        return res.status(400).json({ message: 'Un jeton existe déjà pour cet email.' });
    }

    const payload: Payload = { email };
    const token: string = generateToken(payload);
    saveTokenForEmail(email, token);

    res.setHeader('Authorization', `${token}`);
    res.json({ email });
};