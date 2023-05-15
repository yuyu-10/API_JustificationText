import{ Request, Response, NextFunction } from 'express';
import { justifyText } from '../controllers/justifyController';

export const handleJustifyRequest = (req: Request, res: Response) => {
  //Etape un verifier le token
  //- si token inexitant
  //- si token invalide
  //- si token expiré
  //Etape deux verif la table history pour la limite du jour
  //- si entrée inexistante
  //  - crée direct avec le count incrémenté
  //- si limite depassée
  const justify: string = justifyText(req.body.text);
  res.setHeader('content-type', 'text/plain');
  res.send(justify);
};