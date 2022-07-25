require('dotenv').config();

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (req, res, mess) => {
  res.status(401).send({
    message: mess,
    adress: `From ${req.headers.origin} to ${req.headers.host}`
  });
};

module.exports.auth = (req, res, next) => {
  const token = req.headers.token;
  if (!token){
    handleAuthError(req, res, 'Токена нет');
    return res.end();
  }
  else {
    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret'
      );
    } catch (err) {
        handleAuthError(req, res, 'Токен неверен');
        return res.end();
    }

    req.user = payload;
    next();
  }
};
