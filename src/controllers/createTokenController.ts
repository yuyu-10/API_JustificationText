import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

interface Payload {
    email: string;
}

const secret = process.env.SECRET_CODE_TOKEN;
const expiresIn = '24h';

export const generateToken = (payload: Payload): string => {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};

let tokensByEmail: { [email: string]: { token: string, words: number } } = {};

export const tokenExistsForEmail = (email: string): boolean => {
    return !!tokensByEmail[email];
};

export const saveTokenForEmail = (email: string, token: string): void => {
    tokensByEmail[email] = { token, words: 0 };
    console.log(tokensByEmail);
};