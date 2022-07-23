import React from 'react';
import Card from './Card';
import rectangle from '../../images/rectangle.svg';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Main(props){
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__appearance">
          <div className="profile__avatar" style={{ backgroundImage : `url(${currentUser.avatar})` }} >
            <div className="profile__avatar-darks">
              <img src={rectangle} alt="редактирование аватара" className="profile__edit-avatar-button" onClick={props.onEditAvatar} />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" name="edit-button" className="profile__edit-button" aria-label="редактирование профиля" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" name="add-button" aria-label="добавление изображения" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
