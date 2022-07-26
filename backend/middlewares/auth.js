const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (req, res, mess) => {
  res.status(401).send({
    message: mess,
    adress: `From ${req.headers.origin} to ${req.headers.host}`,
  });
};

module.exports.auth = (req, res, next) => {
  const token = //req.headers;
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlYmZhOTFiNjEwZDc3NzM1YzY4NWMiLCJpYXQiOjE2NTg4NDEyODUsImV4cCI6MTY1OTQ0NjA4NX0.UAQMAE-Bhy_nPwMr45_S2xpsDo0DHV91FaRyFONv8yg';

  if (!token) handleAuthError(req, res, 'Токена нет');
  else {
    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
      );
    } catch (err) { handleAuthError(req, res, 'Токена неверен'); }

    req.user = payload;
    next();
  }
};
