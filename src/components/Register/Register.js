import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo_main-1.svg";

function Register() {
  const [formValue, setFormValue] = useState({
    name: "Виталий",
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
    <div className="register">
      <div className="register__container">
        <header>
          <Link to="/" className="register__logo-link">
            <img
              src={logo}
              className="register__logo"
              alt="Логотип сайта"
            ></img>
          </Link>
        </header>
        <main>
          <h2 className="register__title">Добро пожаловать!</h2>
          <form className="register__form">
            <label className="register__label">
              Имя
              <input
                name="name"
                type="text"
                className="register__input"
                required
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={formValue.name || ""}
                onChange={handleChange}
              />
              <span className="register__error"></span>
            </label>
            <label className="register__label">
              E-mail
              <input
                className="register__input"
                name="email"
                type="email"
                required
                placeholder="E-mail"
                minLength="2"
                maxLength="40"
                value={formValue.email || ""}
                onChange={handleChange}
              />
              <span className="register__error"></span>
            </label>
            <label className="register__label">
              Пароль
              <input
                className="register__input register__input_error"
                name="password"
                type="password"
                required
                placeholder="Пароль"
                minLength="2"
                maxLength="40"
                value={formValue.password || ""}
                onChange={handleChange}
              />
              <span className="register__error">Что-то пошло не так...</span>
            </label>
            <button className="register__btn">Зарегистрироваться</button>
          </form>
        </main>
        <footer className="register__wrapper">
          <span className="register__caption">Уже зарегистрированы? </span>
          <Link className="register__link" to="/signin">
            Войти
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Register;
