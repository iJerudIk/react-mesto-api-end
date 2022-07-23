import React from 'react';

function Login(props){
  const email = React.useRef();
  const password = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuthorize(password.current.value, email.current.value);
  }

  return (
    <section className="auth">
      <form name="registartion" className="auth__form" onSubmit={handleSubmit}>
      <h3 className="auth__form-title">Вход</h3>
        <div className="auth__field auth__field_content_email">
          <input
            type="email" name="email"
            placeholder="Email"
            className="auth__input"
            required ref={email}
          />
        </div>
        <div className="auth__field auth__field_content_password">
          <input
            type="password" name="password"
            placeholder="Пароль"
            className="auth__input"
            required ref={password}
          />
        </div>
        <button type="submit" className="auth__form-submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;
