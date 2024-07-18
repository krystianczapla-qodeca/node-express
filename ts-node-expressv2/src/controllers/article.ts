import { validationResult } from "express-validator";
import { NextFunction, RequestHandler } from "express";
// import Article from "../models/article";
import { CustomError } from "../interfaces/error";
import { ObjectId } from "mongoose";
import { Article, ArticleInput, ArticleDocument } from "../models/article";
import { User } from "../models/user";

export const getArticles: RequestHandler = async (req, res, next) => {
  // const userId = req.params.userId;
  try {
    const articles = await Article.find();
    // const articles = await Article.find({ userId: userId });
    res.status(200).json({
      message: "Fetched articles successfully.",
      articles: articles,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getArticle: RequestHandler<{ id: string }> = async (req, res, next) => {
  const articleId = req.params.id;
  const userId = (req as any).userId; // !!!!!!!!!!!!!!!!!!!!!!
  try {
    const user = await User.findById(userId); 
    if (!user) {
      const error: CustomError = new Error('User not found');
      error.statusCode = 422;
      return next(error);
    }
    const article = await Article.findOne({ _id: articleId, userId: userId });
    if (!article) {
      const error: CustomError = new Error('Article not found');
      error.statusCode = 422;
      return next(error);
    }
    res.status(200).json({
      message: "Fetched successfully.",
      article: article,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const createArticle: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { title, content } = req.body as ArticleInput;
  const userId = (req as any).userId; // !!!!!!!!!!!!!!!!!!!!!!

  try {
    let user = await User.findById(userId); // ????
    if (!user) {
      const error: CustomError = new Error('User not found');
      error.statusCode = 422;
      return next(error);
    }
    const newArticle = new Article({
      title,
      content,
      userId,
    });
    await newArticle.save();
    user.article.push(newArticle._id as ObjectId);
    await user.save();
    res.status(201).json({
      message: "Created the article.",
      createdArticle: newArticle,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const updateArticle: RequestHandler<{ id: string }> = async (req, res, next) => {
  const articleId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { title, content } = req.body as ArticleInput;
  const userId = (req as any).userId; // !!!!!!!!!!!!!!!!!!!!!!
  try {
    const article = await Article.findById(articleId) as ArticleDocument;
    if (!article) {
      const error: CustomError = new Error("Could not find article.");
      error.statusCode = 404;
      throw error;
    }
    if (article.userId.toString() !== userId) {
      const error: CustomError = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    if (title) article.title = title;
    if (content) article.content = content;
    const result = await article.save();
    res.status(200).json({
      message: "Article updated.",
      createdArticle: result,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteArticle: RequestHandler<{ id: string }> = async (req, res, next) => {
  const articleId = req.params.id;
  const userId = (req as any).userId; // !!!!!!!!!!!!!!!!!
  try {
    const article = await Article.findById(articleId) as ArticleDocument;
    if (!article) {
      const error: CustomError = new Error("Could not find article.");
      error.statusCode = 404;
      throw error;
    }
    const user = await User.findById(userId); 
    if (!user) {
      const error: CustomError = new Error('User not found');
      error.statusCode = 422;
      return next(error);
    }
    // await article.deleteOne();
    await Article.findOneAndDelete({ _id: articleId });
    user.article = user.article.filter(id => id.toString() !== articleId);
    await user.save();
    res.status(200).json({ message: "Deleted article." });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
