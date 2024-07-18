import { CustomError } from "../interfaces/error";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User, UserInput, UserDocument } from "../models/user";
import { RequestHandler } from "express";

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { email, name, password } = req.body as UserInput;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user: UserInput = {
      email: email,
      name: name,
      password: hashedPw,
    };
    const userCreated = new User(user);
    const result = await userCreated.save();
    res.status(201).json({
      message: "User created!",
      userId: result._id,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as UserInput;
  let loadedUser: UserDocument;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error: CustomError = new Error(
        "A user with this email could not be found."
      );
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      const error: CustomError = new Error("Wrong password.");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
      userId: loadedUser._id,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


// export const signup: RequestHandler = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error: CustomError = new Error("Validation failed.");
//     error.statusCode = 422;
//     error.data = errors.array();
//     return next(error);
//   }

//   const { email, name, password } = req.body as { email: string; name: string; password: string };

//   try {
//     const hashedPw = await bcrypt.hash(password, 12);
//     const user = new User({
//       email,
//       name,
//       password: hashedPw,
//     });
//     const result = await user.save();
//     res.status(201).json({
//       message: "User created!",
//       userId: result._id,
//     });
//   } catch (err) {
//     const error = err as CustomError;
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// };

// ----------------------------

// export const login: RequestHandler = async (req, res, next) => {
//   const { email, password } = req.body as { email: string; password: string };
//   let loadedUser: UserInterface;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       const error: CustomError = new Error(
//         "A user with this email could not be found."
//       );
//       error.statusCode = 401;
//       throw error;
//     }
//     loadedUser = user;
//     const passwordIsValid = await bcrypt.compare(password, user.password);
//     if (!passwordIsValid) {
//       const error: CustomError = new Error("Wrong password.");
//       error.statusCode = 401;
//       throw error;
//     }
//     const token = jwt.sign(
//       {
//         email: loadedUser.email,
//         userId: loadedUser._id.toString(),
//       },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1h" }
//     );
//     res.status(200).json({
//       token,
//       userId: loadedUser._id.toString(),
//     });
//   } catch (err) {
//     const error = err as CustomError;
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// };
