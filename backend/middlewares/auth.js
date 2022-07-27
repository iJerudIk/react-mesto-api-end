const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-error');

const handleAuthError = () => {
  throw new UnauthorizedError('Необходима авторизация');
};

module.exports.auth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) next(handleAuthError());
  else {
    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
      );
    } catch (err) { next(handleAuthError()); }

    req.user = payload;
    next();
  }
};
