const Card = require('../models/card');
const { checkErrors } = require('../utils/utils');

const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => { res.status(201).send(data); })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена');
      else if (String(card.owner) === userId) {
        Card.findByIdAndRemove(cardId)
          .then(() => { res.status(200).send({ message: 'Карточка успешно удалена' }); })
          .catch((err) => { checkErrors(err, res, next); });
      } else throw new ForbiddenError('Эта карточка не ваша');
    })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else throw new NotFoundError('Карточка не найдена');
    })
    .catch((err) => { checkErrors(err, res, next); });
};
module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else throw new NotFoundError('Карточка не найдена');
    })
    .catch((err) => { checkErrors(err, res, next); });
};
