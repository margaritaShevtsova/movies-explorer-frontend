import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo_main-1.svg";

function Login() {
  const [formValue, setFormValue] = useState({
    email: "pochta@yandex.ru",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo-link">
          <img src={logo} className="login__logo" alt="Логотип сайта"></img>
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form">
          <label className="login__label">
            E-mail
            <input
              className="login__input"
              name="email"
              type="email"
              required
              placeholder="E-mail"
              minLength="2"
              maxLength="40"
              value={formValue.email || ""}
              onChange={handleChange}
            />
            <span className="login__error"></span>
          </label>
          <label className="login__label">
            Пароль
            <input
              className="login__input login__input_error"
              name="password"
              type="password"
              required
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              value={formValue.password || ""}
              onChange={handleChange}
            />
            <span className="login__error"></span>
          </label>
          <button className="login__btn">Войти</button>
        </form>
        <div className="login__wrapper">
          <span className="login__caption">Ещё не зарегистрированы?</span>
          <Link className="login__link" to="/signup">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
