import express, { Router } from "express";
import { login, signup } from "../controllers/auth";
import { body } from "express-validator";

import User from "../models/user";

const router = Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      //   .custom(async (value) => {
      //     const userDoc = await User.findOne({ email: value });
      //       if (userDoc) {
      //           return Promise.reject("Email address already exists!");
      //       }
      //   })
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

router.post("/login", login);

export default router;
