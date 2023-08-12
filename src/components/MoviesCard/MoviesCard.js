import React from "react";
import "./MoviesCard.css";
import { useState } from "react";

function MoviesCard({ card }) {
  function handleClick() {
    setIsSaved(!isSaved);
  }

  const [isSaved, setIsSaved] = useState(false);

  return (
    <li className="card">
      <a className="card__link" href="#">
        <img className="card__image" src={card.src} alt="Обложка альбома" />
        <button
          className={!isSaved ? "card__save-btn" : "card__save-btn_active"}
          onClick={handleClick}
        >
          {!isSaved ? "Сохранить" : ""}
        </button>
      </a>
      <div className="card__content">
        <h2 className="card__name">{card.name}</h2>
        <span className="card__descr">1ч 17м</span>
      </div>
    </li>
  );
}

export default MoviesCard;
