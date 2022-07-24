const jwt = require('jsonwebtoken');

//require('dotenv').config();
//const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

module.exports.auth = (req, res, next) => {
  if (!req.cookies.token){
    res.status(401).send({ message: 'Кука нет' });
    res.end();
  }
  else {
    let payload;

    try {
      payload = jwt.verify(
        req.cookies.token,
        'super-strong-secret'
      );
    } catch (err) {
       res.status(401).send({ message: 'Токен неверен' });
       res.end();
    }

    req.user = payload;
    next();
  }
};
