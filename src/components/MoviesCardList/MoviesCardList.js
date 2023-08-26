import React, { useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  isDesktopPoint,
  isTabletPoint,
  LG_ROW_CARD_COUNT,
  MD_ROW_CARD_COUNT,
  SM_ROW_CARD_COUNT,
  LG_INITIAL_CARD_COUNT,
  MD_INITIAL_CARD_COUNT,
  SM_INITIAL_CARD_COUNT,
} from "../../constants/constants";

function MoviesCardList({
  cards,
  cardsSettings,
  isSubmitted,
  handleAddMovie,
  handleDeleteMovie,
  isSavedCards,
  successCardRequest,
  isOnSearch,
}) {
  const isDesktop = useMediaQuery(isDesktopPoint);
  const isTablet = useMediaQuery(isTabletPoint);
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

  useEffect(() => {
    setVisibleCardCount(initialCardCount);
  }, [isSubmitted]);

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
        {cards.length === 0 && isSubmitted && isOnSearch ? (
          <span className="cards__statement">Ничего не найдено</span>
        ) : (
          cards.length > 0 &&
          cards
            .slice(0, roundedVisibleCardCount)
            .map((card) => (
              <MoviesCard
                key={card.id || card.movieId}
                card={card}
                handleAddMovie={handleAddMovie}
                handleDeleteMovie={handleDeleteMovie}
                isSavedCards={isSavedCards}
                successCardRequest={successCardRequest}
              />
            ))
        )}
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
