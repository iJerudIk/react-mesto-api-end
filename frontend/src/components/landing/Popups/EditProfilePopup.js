import React from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [inputName, setInputName] = React.useState('');
  const [inputDescription, setInputDescription] = React.useState('');

  function handleChangeInputName(e) {setInputName(e.target.value)}
  function handleChangeInputDescription(e) {setInputDescription(e.target.value)}

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: inputName,
      about: inputDescription,
    });
  }

  React.useEffect(() => {
    if(!props.isOpen){
      setInputName(currentUser.name);
      setInputDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen])

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" onSubmit={handleSubmit} {...props}>
      <div className="popup__field popup__field_content_name">
        <input
          type="text" name="name"
          placeholder="Ваше имя"
          id="name-input" maxLength="40"
          className="popup__input popup__input_content_name"
          required minLength="2"
          value={inputName || ''}
          onChange={handleChangeInputName}
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__field popup__field_content_job">
        <input
          type="text" name="about"
          placeholder="Кто вы?"
          id="about-input" required
          className="popup__input popup__input_content_job"
          minLength="2" maxLength="200"
          value={inputDescription || ''}
          onChange={handleChangeInputDescription}
        />
        <span className="popup__input-error about-input-error"></span>
      </div>
    </PopupWithForm>
  )
}


export default EditProfilePopup;
