const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const InternalServerError = require('../errors/internal-server-error');

module.exports.checkErrors = (err, res, next) => {
  if (err.name === 'ValidationError') { next(new ValidationError('Переданы некорректные данные')); }
  if (err.code === 11000) { next(new ConflictError('Запрос конфликтует с текущими данными')); }
  if (err.statusCode === 403 || err.statusCode === 401 || err.statusCode === 404) { next(err); }
  next(new InternalServerError('Неизвестная ошибка сервера'));
};
