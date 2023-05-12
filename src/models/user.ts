import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  token: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  limit: Number
});

export default mongoose.model<IUser>('User', userSchema);