import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";
import {Link} from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link className="portfolio__link" to="/movies">
            <p className="portfolio__text">Статичный сайт</p>
            <img className="portfolio__img" src={arrow} alt="Стрелка перехода"/>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link" to="/movies">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img className="portfolio__img" src={arrow}  alt="Стрелка перехода"/>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link" to="/movies">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img className="portfolio__img" src={arrow}  alt="Стрелка перехода"/>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
