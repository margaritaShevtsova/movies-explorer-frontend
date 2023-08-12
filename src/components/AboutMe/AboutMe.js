import React from "react";
import "./AboutMe.css";
import photo from "../../images/student.png";

function AboutMe() {
  return (
    <section className="about-me" id="aboutMe">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__block">
          <h3 className="about-me__subtitle">Виталий</h3>
          <span className="about-me__caption">
            Фронтенд-разработчик, 30 лет
          </span>
          <p className="about-me__descr">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/margaritaShevtsova"
          >
            Github
          </a>
        </div>
        <img className="about-me__image" src={photo} alt="Фото студента"></img>
      </div>
    </section>
  );
}

export default AboutMe;
