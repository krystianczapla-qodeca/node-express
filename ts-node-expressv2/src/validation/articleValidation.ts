import { body } from 'express-validator';

export const articleValidationRules = [
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long.'),
  body('content').trim().isLength({ min: 5 }).withMessage('Content must be at least 5 characters long.')
];