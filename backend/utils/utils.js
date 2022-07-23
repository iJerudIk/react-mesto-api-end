module.exports.checkErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err.code === 11000) {
    res.status(409).send({ message: 'Почта уже зарегестрирована' });
    return;
  }
  res.status(500).send({ message: 'Неизвестная ошибка' });
};
