import React from 'react';
import { Link } from "react-router-dom";

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import logo from '../../images/logo.svg';

function Header(props){
  const currentUser = React.useContext(CurrentUserContext);
  const authLinkText = {
    'sign-in' : 'Войти',
    'sign-up' : 'Регистрация'
  }
  return (
    <header className="header">
      <a href="/"><img src={logo} alt="логотип" className="header__logo" /></a>
      <div className="header__rigth-part">
      {props.loggedIn ?
        (
          <>
            <p className="header__user-email">{currentUser.email}</p>
            <button className="header__logout" onClick={props.onLogout}>Выйти</button>
          </>
        ) :
        (
          <Link className="header__auth-link" to={`/${props.authLink}`}>{authLinkText[props.authLink]}</Link>
        )}
      </div>
    </header>
  )
}

export default Header;
