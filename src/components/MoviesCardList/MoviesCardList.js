import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const LG_ROW_CARD_COUNT = 3;
const MD_ROW_CARD_COUNT = 2;
const SM_ROW_CARD_COUNT = 2;

const LG_INITIAL_CARD_COUNT = 12;
const MD_INITIAL_CARD_COUNT = 8;
const SM_INITIAL_CARD_COUNT = 5;

function MoviesCardList({ cards, cardsSettings, isSubmitted, handleAddMovie, handleDeleteMovie, isSavedCards }) {
  const isDesktop = useMediaQuery("(min-width: 1260px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT
    : isTablet
    ? MD_ROW_CARD_COUNT
    : SM_ROW_CARD_COUNT;

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

  const [visibleCardCount, setVisibleCardCount] = React.useState(
    initialCardCount
  );

  const roundedVisibleCardCount =
    Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

  const handleClick = () => {
    calculateCardCount();
  };

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
  };

  return (
    <section className="cards">
      <ul className="cards__list">
        {(cards.length === 0 && isSubmitted) ? (<span className="cards__statement">Ничего не найдено</span>) 
        : cards.length > 0 && cards.slice(0, roundedVisibleCardCount).map((card) => (
          <MoviesCard key={card.id || card.movieId} card={card} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie} isSavedCards={isSavedCards}/>
        ))}
      </ul>
      {roundedVisibleCardCount < cards.length && (
        <button
          className={`cards__btn ${cardsSettings !== "allCards" &&
            "cards__btn_visibility_hidden"}`}
          onClick={handleClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
