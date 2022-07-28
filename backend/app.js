require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');

const { cardRoutes } = require('./routes/cards');
const { userRoutes } = require('./routes/users');

const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsAccessHandler } = require('./middlewares/cors');

const NotFoundError = require('./errors/not-found-error');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express(); // Создание приложения
mongoose.connect('mongodb://localhost:27017/mestodb'); // Подключение к БД

app.use(bodyParser.json());
app.use(limiter);

app.use(corsAccessHandler);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?([\W\\\da-z-]{2,200})/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/cards', auth, cardRoutes);
app.use('/users', auth, userRoutes);

app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => { next(new NotFoundError('Страница не найдена')); });

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  res.send({ message: err.message });
  next();
});

// Запуск сервера
app.listen(3000);
