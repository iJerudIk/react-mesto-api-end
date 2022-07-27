const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { checkErrors } = require('../utils/utils');

const NotFoundError = require('../errors/not-found-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (data) res.send(data);
      else throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (data) res.send(data);
      else throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((data) => { res.status(201).send(data); })
        .catch((err) => { checkErrors(err, res, next); });
    });
};
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => { checkErrors(err, res, next); });
};
