import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__desc-wrapper">
        <div className="project__wrapper">
          <h3 className="project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__wrapper">
          <h3 className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__info">
        <div className="project__block">
          <span className="project__block-left">1 неделя</span>
          <span className="project__caption">Back-end</span>
        </div>
        <div className="project__block">
          <span className="project__block-right">4 недели</span>
          <span className="project__caption">Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
