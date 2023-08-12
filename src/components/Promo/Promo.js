import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Promo.css";


function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      <ul className="promo__list">
        <li className="promo__item">
          <AnchorLink href="#project" className="promo__link">
            О проекте
          </AnchorLink>
        </li>
        <li className="promo__item">
          <AnchorLink href="#techs" className="promo__link">
            Технологии
          </AnchorLink>
        </li>
        <li className="promo__item">
          <AnchorLink href="#aboutMe" className="promo__link">
            Студент
          </AnchorLink>
        </li>
      </ul>
      </div>
    </section>
  );
}

export default Promo;