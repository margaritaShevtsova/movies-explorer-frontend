import React, { useState } from "react";
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

  const cards = React.useContext(SavedMoviesContext);

  function handleSearch(value) {
    if (cards.length > 0) setFilteredCards(filter(cards, value, isChecked));
    setIsSubmitted(true);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  function handleDeleteCard(card) {
    return handleDeleteMovie(card)
    .then(()=> {
      if(isSubmitted)
      setFilteredCards(() => {
        return filteredCards.filter((item) => {
          return item._id !== card._id;
        });
      });
    })
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} activeItem={activeItem} />
      <main>
        <SearchForm
          handleSearch={handleSearch}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
        <MoviesCardList
          cardsSettings="savedCards"
          cards={filteredCards || cards}
          isSavedCards={isSavedCards}
          handleDeleteMovie={handleDeleteCard}
          isSubmitted={isSubmitted}
          successCardRequest={successCardRequest}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
