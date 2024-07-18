import mongoose, { Schema, Model, Document, ObjectId } from "mongoose";

type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  article: ObjectId[]; // string[]; 
  // role: string;
};

type UserInput = {
  name: UserDocument["name"];
  email: UserDocument["email"];
  password: UserDocument["password"];
  article?: ObjectId[];
  // role?: UserDocument["role"];
};

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  article: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  ],
  // role: {
  //   type: Schema.Types.String,
  //   required: true,
  //   default: 'user', // Default role // user / admin / etc.
  // }
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);
export { User, UserInput, UserDocument };



// ----------------------------
// module.exports = mongoose.model('User', userSchema);
// ----------------------------
// import mongoose, { Document } from "mongoose";
// import { ObjectId } from 'mongodb';

// const Schema = mongoose.Schema;

// // Interfejs użytkownika
// export interface UserInterface extends Document {
//   _id: ObjectId;
//   name: string;
//   email: string;
//   password: string;
// }

// // Schemat użytkownika
// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     // user / admin
//     // posts: [
//     //     {
//     //         type: Schema.Types.ObjectId,
//     //         ref: 'Article'
//     //     }
//     // ]
//   }
// );

// export default mongoose.model<UserInterface>('User', userSchema);
// // module.exports = mongoose.model('User', userSchema);
