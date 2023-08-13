import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__descr">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__wrapper">
        <span className="footer__caption">© 2020</span>
        <div className="footer__block">
          <a className="footer__link" href="https://practicum.yandex.ru">
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/margaritaShevtsova"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
