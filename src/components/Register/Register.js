import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo_main-1.svg";
import { useFormWithValidation } from "../../hooks/useForm";

function Register({handleRegister}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.password, values.email, values.name);
    setIsSubmitted(true);
  }

  return (
    <div className="register">
      <div className="register__container">
        <header>
          <Link to="/" className="register__logo-link" replace>
            <img
              src={logo}
              className="register__logo"
              alt="Логотип сайта"
            ></img>
          </Link>
        </header>
        <main>
          <h2 className="register__title">Добро пожаловать!</h2>
          <form
            className="register__form"
            onSubmit={handleSubmit}
          >
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
                value={values.name || ""}
                onChange={handleChange}
              />
              <span className={errors.name && "register__error"}>
                {errors.name || ""}
              </span>
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
                value={values.email || ""}
                onChange={handleChange}
              />
              <span className={errors.email && "register__error"}>
                {errors.email || ""}
              </span>
            </label>
            <label className="register__label">
              Пароль
              <input
                className="register__input"
                name="password"
                type="password"
                required
                placeholder="Пароль"
                minLength="2"
                maxLength="40"
                value={values.password || ""}
                onChange={handleChange}
              />
              <span className={errors.password && "register__error"}>
                {errors.password || ""}
              </span>
            </label>
            <span className="input__error">
              {!isValid && isSubmitted ? "Что-то пошло не так" : ""}
            </span>
            <button
              className="register__btn"
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
          </form>
        </main>
        <footer className="register__wrapper">
          <span className="register__caption">Уже зарегистрированы? </span>
          <Link className="register__link" to="/signin" replace>
            Войти
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Register;
