const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi, errors } = require('celebrate');

const { cardRoutes } = require('./routes/cards');
const { userRoutes } = require('./routes/users');

const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsAccessHandler } = require('./middlewares/cors');

/*const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});*/

const app = express(); // Создание приложения
mongoose.connect('mongodb://localhost:27017/mestodb'); // Подключение к БД

app.use(cookieParser());
app.use(bodyParser.json());
//app.use(limiter);

app.use(corsAccessHandler);

app.use(requestLogger);

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

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

// Запуск сервера
app.listen(3000);
