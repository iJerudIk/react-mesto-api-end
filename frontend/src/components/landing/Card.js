import React from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Card(props){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardDeleteButtonClassName = (
    `elements__delete-button ${!isOwn ? 'elements__delete-button_hidden' : ''}`
  );
  const cardLikeButtonClassName = (
    `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__element">
      <div className={cardDeleteButtonClassName} onClick={handleDeleteClick}></div>
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="elements__bottom">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="elements__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
