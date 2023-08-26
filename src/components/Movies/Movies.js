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
  activeItem,
  isLoggedIn,
  handleAddMovie,
  handleDeleteMovie,
  isSavedCards,
  successCardRequest,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOnSearch, setIsOnSearch] = useState(false);

  useEffect(() => {
    const searchSettings = JSON.parse(localStorage.getItem("searchSettings"));
    if (searchSettings) {
      setFilteredCards(searchSettings.cards);
      setSearchValue(searchSettings.searchValue);
      setIsChecked(searchSettings.checked);
    }
  }, []);

  useEffect(() =>{
    if(cards.length > 0) {
      setFilteredCards(filter(cards, searchValue, isChecked));
      localStorage.setItem(
        "searchSettings",
        JSON.stringify({
          cards: filter(cards, searchValue, isChecked),
          searchValue: searchValue,
          checked: isChecked,
        })
      );
    } else if (filteredCards.length > 0) {
      setFilteredCards(filter(filteredCards, searchValue, isChecked));
      localStorage.setItem(
        "searchSettings",
        JSON.stringify({
          cards: filter(cards, searchValue, isChecked),
          searchValue: searchValue,
          checked: isChecked,
        })
      );
    }
  },[isChecked])

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
    setIsSubmitted(false);
    if (cards.length === 0) {
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
          setSearchValue(value);
        })
        .finally(() => {
          setIsLoading(false);
          setIsSubmitted(true);
          setIsOnSearch(true);
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
      setSearchValue(value);
    }
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} activeItem={activeItem}/>
      <main>
        <SearchForm
          handleSearch={handleSearch}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          searchValue={searchValue}
          isLoading={isLoading}
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
            successCardRequest={successCardRequest}
            isOnSearch={isOnSearch}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
