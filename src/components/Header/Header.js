import React from "react";
import "./Header.css";
import logo from "../../images/logo_main-1.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn }) {
  const [isNav, setIsNav] = useState(false);
  function handleBurgerClick() {
    setIsNav(true);
  }

  function handleNavClose() {
    setIsNav(false);
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="Логотип сайта"></img>
      </Link>
      {isLoggedIn ? (
        <>
          <div className="header__wrapper">
            <Link
              className="header__link header__link_type_movies"
              to="/movies"
              replace
            >
              Фильмы
            </Link>
            <Link
              className="header__link header__link_type_saved-movies"
              to="/saved-movies"
              replace
            >
              Сохранённые фильмы
            </Link>
          </div>
          <Link
            className="header__link header__link_type_profile"
            to="/profile"
            replace
          >
            Аккаунт
          </Link>
          <button className="burger" onClick={handleBurgerClick}>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
          {isNav && (
            <Navigation handleClose={handleNavClose} activeItem="фильмы" />
          )}
        </>
      ) : (
        <div>
          <Link
            className="header__link header__link_type_register"
            to="/signup"
            replace
          >
            Регистрация
          </Link>
          <Link
            className="header__link header__link_type_signin"
            to="/signin"
            replace
          >
            Войти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
