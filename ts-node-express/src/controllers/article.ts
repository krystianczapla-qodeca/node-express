import { validationResult } from "express-validator";
import { RequestHandler } from "express";
import Article from "../models/article";
// const Article = require("../models/article");
import { CustomError } from "../interfaces/error";

export const getArticles: RequestHandler = async (req, res, next) => {
  // walidacja
  
  try {
    const articles = await Article.find();
    res.status(200).json({
      message: "Fetched posts successfully.",
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

export const createArticle: RequestHandler = async (req, res, next) => {
  // walidacja

  const title = (req.body as { title: string }).title;
  const content = (req.body as { content: string }).content;
  const newArticle = new Article({
    title: title,
    content: content,
  });

  try {
    await newArticle.save();
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

export const updateArticle: RequestHandler<{id: string}> = async (req, res, next) => {
  // walidacja

  const articleId = req.params.id;
  const title = (req.body as { title: string}).title;
  const content = (req.body as { content: string}).content;
  
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      const error: CustomError = new Error("Could not find article.");
      error.statusCode = 404;
      throw error;
    }
    article.title = title;
    article.content = content;
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

export const deleteArticle: RequestHandler<{id: string}> = async (req, res, next) => {
  // walidacja

  const articleId = req.params.id;
  try {
    const article = await Article.findById(articleId);
    if( !article) {
      const error: CustomError = new Error("Could not find article.");
      error.statusCode = 404;
      throw error;
    }
    // await Article.findByIdAndRemove(articleId);
    await article.deleteOne();
    res.status(200).json({ message: "Deleted article." });
  } catch (err) {
    const error = err as CustomError;
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};