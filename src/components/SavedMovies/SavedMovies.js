import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import { filter } from "../../utils/filter";
import { SavedMoviesContext } from "../../contexts/CurrentUserContext";

function SavedMovies({
  activeItem,
  isLoggedIn,
  isSavedCards,
  handleDeleteMovie,
  successCardRequest,
}) {
  const [filteredCards, setFilteredCards] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOnSearch, setIsOnSearch] = useState(false);

  const cards = React.useContext(SavedMoviesContext);

  useEffect(() => {
    setIsSubmitted(false);
    if (cards.length > 0) {
      handleSearch(searchValue);
    }
    if (filteredCards && filteredCards.length === 0) {
      setIsSubmitted(false);
    }
  }, [isChecked]);

  function handleSearch(value) {
    setIsSubmitted(false);
    if (cards.length > 0) setFilteredCards(filter(cards, value, isChecked));
    setIsSubmitted(true);
    setIsOnSearch(true);
  }

  function handleCheckboxChange(value) {
    setIsChecked(!isChecked);
    setSearchValue(value || "");
  }

  function handleDeleteCard(card) {
    return handleDeleteMovie(card).then(() => {
      if (isSubmitted)
        setFilteredCards(() => {
          return filteredCards.filter((item) => {
            return item._id !== card._id;
          });
        });
        if (cards.length <= 1) {
          setIsOnSearch(false);}
    });
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} activeItem={activeItem} />
      <main>
        <SearchForm
          handleSearch={handleSearch}
          isChecked={isChecked}
          handleCheckboxChangeSaved={handleCheckboxChange}
          isLoading={false}
          cardsSettings="savedCards"
        />
        <MoviesCardList
          cardsSettings="savedCards"
          cards={filteredCards || cards}
          isSavedCards={isSavedCards}
          handleDeleteMovie={handleDeleteCard}
          isSubmitted={isSubmitted}
          successCardRequest={successCardRequest}
          isOnSearch={isOnSearch}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
