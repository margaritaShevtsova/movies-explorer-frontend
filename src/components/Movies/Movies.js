import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { filter } from "../../utils/filter";
import moviesApi from "../../utils/MoviesApi";

function Movies({
  isLoggedIn,
  handleAddMovie,
  handleDeleteMovie,
  isSavedCards,
}) {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const searchSettings = JSON.parse(localStorage.getItem("searchSettings"));
    if (searchSettings) {
      setFilteredCards(searchSettings.cards);
      setSearchValue(searchSettings.searchValue);
      setIsChecked(searchSettings.checked);
    }
  }, []);

  function getAllMovies() {
    return moviesApi
      .getMovies()
      .then((res) => {
        setCards(res);
        return res;
      })
      .catch((err) => console.error(err));
  }

  function handleSearch(value) {
    if (cards.length === 0) {
      console.log(cards.length);
      setIsSubmitted(false);
      setIsLoading(true);
      return getAllMovies()
        .then((res) => {
          setFilteredCards(filter(res, value, isChecked));
          localStorage.setItem(
            "searchSettings",
            JSON.stringify({
              cards: filter(res, value, isChecked),
              searchValue: value,
              checked: isChecked,
            })
          );
        })
        .finally(() => {
          setIsLoading(false);
          setIsSubmitted(true);
        });
    } else {
      setFilteredCards(filter(cards, value, isChecked));
      localStorage.setItem(
        "searchSettings",
        JSON.stringify({
          cards: filter(cards, value, isChecked),
          searchValue: value,
          checked: isChecked,
        })
      );
    }
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
          searchValue={searchValue}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={filteredCards}
            cardsSettings="allCards"
            isSubmitted={isSubmitted}
            handleAddMovie={handleAddMovie}
            handleDeleteMovie={handleDeleteMovie}
            isSavedCards={isSavedCards}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
