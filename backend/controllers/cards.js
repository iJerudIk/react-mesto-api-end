const Card = require('../models/card');
const { checkErrors } = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => { res.status(201).send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) res.status(404).send({ message: 'Карточка не найден' });
      else if (String(card.owner) === userId) {
        Card.findByIdAndRemove(cardId)
          .then(() => { res.status(200).send({ message: 'Карточка удалена' }); })
          .catch((err) => { checkErrors(err, res); });
      } else res.status(403).send({ message: 'Эта карточка не ваша' });
    });
};
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: 'Карточка не найден' });
    })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: 'Карточка не найден' });
    })
    .catch((err) => { checkErrors(err, res); });
};
