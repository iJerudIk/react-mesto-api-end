import React from 'react';

function ImagePopup(props) {
  function handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')){
      props.onClose();
    }
  }

  return (
    <div onMouseDown={handleOverlayClose}>
      <div className={`popup popup_content_place-info ${props.card.isOpen && 'popup_opened'}`} >
        <div className="popup__content popup__content_content_image">
          <button type="button" name="button-close" className="popup__close-button" onClick={props.onClose}></button>
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <h2 className="popup__title">{props.card.name}</h2>
        </div>
      </div>
    </div>
  )
}


export default ImagePopup;
