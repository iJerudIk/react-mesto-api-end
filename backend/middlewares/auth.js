const jwt = require('jsonwebtoken');

//require('dotenv').config();
//const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

module.exports.auth = (req, res, next) => {
  if (req.cookies.token) handleAuthError(res);
  else {
    let payload;

    try {
      payload = jwt.verify(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ5MmU4ZmIxOGExMDM4OGIyZTdlMmMiLCJpYXQiOjE2NTg1Njk0MzEsImV4cCI6MTY1OTE3NDIzMX0.UEiMVqbtSEAtYldMxAs26McyLcSZHLH7jybv20-TFBE',
        'super-strong-secret'
      );
    } catch (err) { res.status(401).send({ message: 'Токен неверен' }); }

    req.user = payload;
    next();
  }
};
