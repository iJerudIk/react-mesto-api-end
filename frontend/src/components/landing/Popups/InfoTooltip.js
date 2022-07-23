import React from 'react';
import accepeted from '../../../images/accepted-register.png';
import rejected from '../../../images/rejected-register.png';

function InfoTooltip(props) {
  function handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')){
      props.onClose();
    }
  }

  return (
    <div onMouseDown={handleOverlayClose}>
      <div className={`popup popup_content_info-tooltip ${props.isOpen && 'popup_opened'}`} >
        <div className="popup__content">
          <div className="popup__info-tooltip">
            <button type="button" name="button-close" className="popup__close-button" onClick={props.onClose}></button>
            <img className="popup__image-message" src={props.messageStatus ? accepeted : rejected} alt={props.messageStatus ? 'Готово' : 'Ошибка'} />
            <h2 className="popup__message">{props.messageStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}


export default InfoTooltip;
