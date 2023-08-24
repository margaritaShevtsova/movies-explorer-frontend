import React from "react";
import Header from "../Header/Header.js";
import Promo from "../Promo/Promo.js"
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Portfolio from "../Portfolio/Portfolio.js";
import Footer from "../Footer/Footer.js";

function Main({isLoggedIn, activeItem}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} activeItem={activeItem}/>
      <main>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      </main>
      <Footer/>
    </>
  );
}

export default Main;
