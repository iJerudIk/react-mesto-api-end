import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';

import Header from './landing/Header';
import Main from './landing/Main';
import Footer from './landing/Footer';

import PopupWithForm from './landing/Popups/PopupWithForm';
import EditProfilePopup from './landing/Popups/EditProfilePopup';
import EditAvatarPopup from './landing/Popups/EditAvatarPopup';
import AddPlacePopup from './landing/Popups/AddPlacePopup';
import ImagePopup from './landing/Popups/ImagePopup';
import InfoTooltip from './landing/Popups/InfoTooltip';

import ProtectedRoute from './landing/ProtectedRoute';
import Login from './landing/Auth/Login';
import Register from './landing/Auth/Register';

import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const history = useHistory();

  const [registerStatus, setRegisterStatus] = React.useState(false);
  const [loggedIn, setLogged] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen : false});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    if(isLiked){
      api.removeLike(card._id)
        .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c))})
        .catch((err) => {console.log(`Ошибка : ${err}`)});
    }else{
      api.setLike(card._id)
        .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c))})
        .catch((err) => {console.log(`Ошибка : ${err}`)});
    }
  }
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {setCards(state=>state.filter((c) => {return c._id !== card._id}))})
      .catch((err) => {console.log(`Ошибка : ${err}`)});
  }

  function handleEditProfileClick() {setIsEditProfilePopupOpen(true)}
  function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true)}
  function handleAddPlaceClick() {setIsAddPlacePopupOpen(true)}
  function handleCardClick(card) {card.isOpen = true; setSelectedCard(card)}

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({...selectedCard, isOpen : false});
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: userInfo.name,
          about: userInfo.about
        });
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка : ${err}`)});
  }
  function handleUpdateAvatar(userInfo) {
    api.setUserAvatar(userInfo.avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: userInfo.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка : ${err}`)});
  }
  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {console.log(`Ошибка : ${err}`)});
    closeAllPopups();
  }

  function onRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        if(res){
          setRegisterStatus(true);
          setIsInfoTooltipPopupOpen(true);
          history.push('/sign-in');
        }else{
          setRegisterStatus(false);
          setIsInfoTooltipPopupOpen(true);
        }
      })
      .catch((err) => {console.log(`Ошибка : ${err}`)});
  }
  function onAuthorize(password, email) {
    auth.authorize(password, email)
      .then((res) => {
        if(res.token){
          localStorage.setItem('token', res.token);
          setLogged(true);
          history.push('/cards');
        }else{
          setRegisterStatus(false);
          setIsInfoTooltipPopupOpen(true);
        }
      })
      .catch((err) => {console.log(`Ошибка : ${err}`)});
  }
  function onLogout() {
    localStorage.removeItem('token');
    setLogged(false);
    history.push('/sign-in');
  }


  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      api.setToken(token);

      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          setLogged(true);
          history.push('/cards');
        })
        .catch((err) => {
          console.log(`Ошибка : ${err}`);
        })
      api.getInitialCards()
        .then((cards) => {setCards(cards)})
        .catch((err) => {
          console.log(`Ошибка : ${err}`);
        })
    }else{ api.deleteToken(); }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} onLogout={onLogout} />
            <ProtectedRoute
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              component={Main}
            />
            <Footer />
          </Route>

          <Route path="/sign-in">
            <Header authLink="sign-up" loggedIn={false} />
            <Login onAuthorize={onAuthorize} />
          </Route>

          <Route path="/sign-up">
            <Header authLink="sign-in" loggedIn={false} />
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="delete-place" title="Вы уверены?" buttonText="Да">
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} messageStatus={registerStatus} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
