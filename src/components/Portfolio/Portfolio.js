import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://margaritashevtsova.github.io/russian-travel/"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <img
              className="portfolio__img"
              src={arrow}
              alt="Стрелка перехода"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://margaritashevtsova.github.io/mesto"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <img
              className="portfolio__img"
              src={arrow}
              alt="Стрелка перехода"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://shevtsova.mesto.nomoredomains.xyz"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <img
              className="portfolio__img"
              src={arrow}
              alt="Стрелка перехода"
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
