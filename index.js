import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import checkAuth from './utils/checkAuth.js';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

//app.get('/posts', PostController.getAll);
//app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
//app.delete('/posts', checkAuth, postController.remove);
//app.patch('/posts', checkAuth, postController.update);

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
