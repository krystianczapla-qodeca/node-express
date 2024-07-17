import { Router } from "express";
import { getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/article';
const isAuth = require('../middleware/is-auth');

const router = Router();

router.post('/', createArticle);

router.get('/', getArticles);

router.patch('/:id', updateArticle);

router.delete('/:id', deleteArticle);


// router.post('/', isAuth, createArticle);
// router.get('/', isAuth, getArticles);
// router.patch('/:id', isAuth, updateArticle);
// router.delete('/:id', isAuth, deleteArticle);

export default router;
