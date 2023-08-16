import React, { useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies({ isLoggedin }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header isLoggedin={isLoggedin} />
      <main>
        <SearchForm />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList cardsSettings="allCards" />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
