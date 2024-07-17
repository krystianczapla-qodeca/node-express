import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface UserInterface extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}
