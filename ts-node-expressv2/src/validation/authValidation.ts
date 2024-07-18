import { body } from "express-validator";
import { User } from "../models/user";

export const signupValidationRules = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value) => {
      const userDoc = await User.findOne({ email: value });
      if (userDoc) {
        return Promise.reject("E-Mail address already exists!");
      }
    })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 8 }),
  body("name").trim().not().isEmpty(),
];
