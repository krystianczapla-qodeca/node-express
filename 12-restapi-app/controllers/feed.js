const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const io = require('../socket');
const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate('creator')
      .sort({ createdAt: -1 }) // sprawia, że najnowsze posty są na początku
      .skip((currentPage - 1) * perPage) // pomija posty, które są na poprzednich stronach
      .limit(perPage); // ogranicza liczbę postów na stronie

    res.status(200).json({
      message: 'Fetched posts successfully.',
      posts: posts, // zwraca posty
      totalItems: totalItems // zwraca liczbę postów
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  });
  try {
    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();
    io.getIO().emit('posts', {
      action: 'create',
      post: { ...post._doc, creator: { _id: req.userId, name: user.name } }
    });
    res.status(201).json({
      message: 'Post created successfully!',
      post: post,
      creator: { _id: user._id, name: user.name }
    });
  } catch (err) { // nie można użyć return error, więc używamy next(error) 
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  try {
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Post fetched.', post: post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;

  let imageUrl = req.body.image; // jeśli nie przesłano nowego obrazu - zawiera starą ścieżkę
  if (req.file) {
    imageUrl = req.file.path; // jeśli przesłano nowy obraz - nadpisuje starą ścieżkę
  }
  if (!imageUrl) { // jeśli nie ma obrazu
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }

  // sprawdza, czy post istnieje i czy użytkownik jest jego twórcą, a następnie aktualizuje post
  try {
    const post = await Post.findById(postId).populate('creator'); // populate - pobiera dane z relacji
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.creator._id.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    if (imageUrl !== post.imageUrl) {
      clearImage(post.imageUrl); // usuwa stary obraz z serwera
    }
    post.title = title;
    post.imageUrl = imageUrl;
    post.content = content;
    const result = await post.save();

    io.getIO().emit('posts', { action: 'update', post: result }); 
    res.status(200).json({ message: 'Post updated!', post: result });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    // Check logged in user
    clearImage(post.imageUrl); // usuwa obraz z serwera
    await Post.findByIdAndRemove(postId); // usuwa post z bazy danych

    const user = await User.findById(req.userId); // usuwa referencję do posta z użytkownika
    user.posts.pull(postId); // pull - usuwa referencję do posta
    await user.save(); // zapisuje zmiany
    io.getIO().emit('posts', { action: 'delete', post: postId }); // emituje event do klientów
    res.status(200).json({ message: 'Deleted post.' }); // zwraca odpowiedź
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath); // dzięki '..' cofamy się o jeden folder - /images/plik.jpg
  fs.unlink(filePath, err => console.log(err));
};
