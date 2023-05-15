import mongoose, { Schema, Document } from 'mongoose';

export interface IHistory extends Document {
  id_user: string;
  date: string;
  words: number
}

const historySchema: Schema = new mongoose.Schema({
  id_user: String,
  date: {
    type: String,
    required: true
  },
  words: {
    type: Number,
    required: true
  }
});

export default mongoose.model<IHistory>('History', historySchema);