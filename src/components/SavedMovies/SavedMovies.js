import React, {useState} from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import { filter } from "../../utils/filter";

function SavedMovies({
  isLoggedIn,
  cards,
  isSavedCards,
  handleDeleteMovie,
}) {
  const [filteredCards, setFilteredCards] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSearch(value) {
    setFilteredCards(filter(cards, value, isChecked));
    setIsSubmitted(true);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
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
          handleDeleteMovie={handleDeleteMovie}
          isSubmitted={isSubmitted}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
