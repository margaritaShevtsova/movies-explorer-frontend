import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ isLoggedin }) {
  return (
    <>
      <Header isLoggedin={isLoggedin} />
      <main>
        <SearchForm />
        <MoviesCardList cardsSettings="savedCards" />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
