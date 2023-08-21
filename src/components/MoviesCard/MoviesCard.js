import React, { useEffect } from "react";
import { SavedMoviesContext } from "../../contexts/CurrentUserContext";
import "./MoviesCard.css";
import { useState } from "react";

function MoviesCard({
  card,
  handleAddMovie,
  handleDeleteMovie,
  isSavedCards,
}) {
  const savedMovies = React.useContext(SavedMoviesContext);
  const [isSaved, setIsSaved] = useState(false);

  function makeDurationFormat(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? `${hours}ч` : ""} ${
      minutes > 0 ? `${minutes}м` : ""
    }`;
  }

  const {
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    nameRU,
    nameEN,
  } = card;

  const movieId = card.id;
  const image = isSavedCards
    ? card.image
    : `https://api.nomoreparties.co${card.image.url}`;
  const thumbnail = isSavedCards
    ? card.thumbnail
    : `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`;

  useEffect(() => {
    if (card.id && savedMovies) {
      savedMovies.map((movie) => {
        if (movie.movieId === card.id) {
          setIsSaved(true);
          card._id = movie._id;
        }
      });
    }
  },[card]);

  function handleClick() {
    if (!isSaved && !isSavedCards) {
      handleAddMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      });
      setIsSaved(true);
    } else {
      handleDeleteMovie(card);
      setIsSaved(false);
    }
  }

  return (
    <li className="card">
      <a
        className="card__link"
        href={card.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="card__image"
          src={
            isSavedCards
              ? image
              : `https://api.nomoreparties.co${card.image.url}`
          }
          alt={card.nameRU}
        />
      </a>
      <button
        className={
          !isSaved && !isSavedCards ? "card__save-btn" : "card__save-btn_active"
        }
        onClick={handleClick}
      >
        {!isSaved && !isSavedCards ? "Сохранить" : ""}
      </button>
      <div className="card__content">
        <h2 className="card__name">{card.nameRU}</h2>
        <span className="card__descr">{makeDurationFormat(card.duration)}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
