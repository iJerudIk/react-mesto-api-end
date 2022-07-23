import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  React.useEffect(() => {
    if(!props.isOpen){
      nameRef.current.value = '';
      linkRef.current.value = '';
    }
  })

  return (
    <PopupWithForm name="add-place" title="Новое место" buttonText="Создать" onSubmit={handleSubmit} {...props}>
      <div className="popup__field popup__field_content_title">
        <input
          type="text" name="name"
          required id="title-input"
          placeholder="Название"
          className="popup__input popup__input_content_title"
          minLength="2" maxLength="30"
          ref={nameRef}
        />
        <span className="popup__input-error title-input-error"></span>
      </div>
      <div className="popup__field popup__field_content_link">
        <input
          type="url" name="link"
          required id="link-input"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_content_link"
          ref={linkRef}
        />
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}


export default AddPlacePopup;
