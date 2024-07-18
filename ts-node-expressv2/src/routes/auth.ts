import express, { Router } from "express";
import { login, signup } from "../controllers/auth";
import { signupValidationRules } from "../validation/authValidation";

const router = Router();

router.put("/signup", signupValidationRules, signup);

router.post("/login", login);

export default router;
