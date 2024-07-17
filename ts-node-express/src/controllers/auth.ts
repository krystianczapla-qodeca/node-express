import { CustomError } from "../interfaces/error";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { UserInterface } from "../interfaces/user";

import User from "../models/user";
import { RequestHandler } from "express";

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  } else {
    const email = (req.body as { email: string }).email;
    const name = (req.body as { name: string }).name;
    const password = (req.body as { password: string }).password;
  
    try {
      const hashedPw = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        name: name,
        password: hashedPw,
      });
      const result = await user.save();
      res.status(201).json({
        message: "User created!",
        userId: result._id,
      });
    } catch (err) {
      const error = err as CustomError;
      if (error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const email = (req.body as { email: string }).email;
  const password = (req.body as { password: string }).password;
  let loadedUser: UserInterface;
  try {
    const user = await User.findOne({ email: email });
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
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    const error = err as CustomError;
    if (error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// getUserStatus

// updateUserStatus
