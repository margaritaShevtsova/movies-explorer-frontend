import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo_main-1.svg";
import { useFormWithValidation } from "../../hooks/useForm";

function Login({ handleLogin }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.password, values.email);
    setIsSubmitted(true);
  }

  return (
    <div className="login">
      <div className="login__container">
        <header>
          <Link to="/" replace className="login__logo-link">
            <img src={logo} className="login__logo" alt="Логотип сайта"></img>
          </Link>
        </header>
        <main>
          <h2 className="login__title">Рады видеть!</h2>
          <form className="login__form" onSubmit={handleSubmit}>
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
                value={values.email || ""}
                onChange={handleChange}
              />
              <span className={errors.email && "login__error"}>
                {errors.email}
              </span>
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
                value={values.password || ""}
                onChange={handleChange}
              />
              <span className={errors.password && "login__error"}>
                {errors.password}
              </span>
            </label>
            <span className="input__error">
              {!isValid && isSubmitted ? "Что-то пошло не так" : ""}
            </span>
            <button className="login__btn" type="submit" disabled={!isValid}>
              Войти
            </button>
          </form>
        </main>
        <footer className="login__wrapper">
          <span className="login__caption">Ещё не зарегистрированы?</span>
          <Link className="login__link" to="/signup" replace>
            Регистрация
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Login;
