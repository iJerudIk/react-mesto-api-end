const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar
} = require('../controllers/users');

router.get('/', getUsers); // Получение пользователей
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById); // Получение пользователей по id
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser); // Обновление данных пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?([\W\\\da-z-]{2,200})/),
  }),
}), updateUserAvatar); // Обновление аватара пользователя

module.exports = { userRoutes: router };
