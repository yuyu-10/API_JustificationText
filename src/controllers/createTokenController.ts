import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_CODE_TOKEN;

export const generateToken = (email: String): string => {
    console.log(secret)
    const token = jwt.sign(email, secret);
    return token;
};