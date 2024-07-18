import { Router } from "express";
import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article";
import isAuth from "../middleware/is-auth";
import { articleValidationRules } from "../validation/articleValidation";

const router = Router();

router.post("/", isAuth, articleValidationRules, createArticle);

router.get("/", isAuth, getArticles);

router.post("/:id", isAuth, getArticle);

router.patch("/:id", isAuth, articleValidationRules, updateArticle);

router.delete("/:id", isAuth, deleteArticle);

export default router;


// ---------------------------------------------------
// router.post(
//   '/',
//   isAuth,
//   [
//     body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long.'),
//     body('content').trim().isLength({ min: 5 }).withMessage('Content must be at least 5 characters long.')
//   ],
//   createArticle
// );

// router.patch(
//   '/:id',
//   isAuth,
//   [
//     body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long.'),
//     body('content').trim().isLength({ min: 5 }).withMessage('Content must be at least 5 characters long.')
//   ],
//   updateArticle
// );
