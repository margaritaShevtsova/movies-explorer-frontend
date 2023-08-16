import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import image1 from "../../images/pic1.jpg";
import image2 from "../../images/pic2.jpg";
import image3 from "../../images/pic3.jpg";
import image4 from "../../images/pic4.jpg";
import image5 from "../../images/pic5.jpg";
import image6 from "../../images/pic6.jpg";
import image7 from "../../images/pic7.jpg";
import image8 from "../../images/pic8.jpg";
import image9 from "../../images/pic9.jpg";
import image10 from "../../images/pic10.jpg";
import image11 from "../../images/pic11.jpg";
import image12 from "../../images/pic12.jpg";

const cards = [
    { id: 1, src: image1, name: "33 слова о дизайне" },
    { id: 2, src: image2, name: "Киноальманах «100 лет дизайна»" },
    { id: 3, src: image3, name: "В погоне за Бенкси" },
    { id: 4, src: image4, name: "Баския: Взрыв реальности" },
    { id: 5, src: image5, name: "Бег это свобода" },
    { id: 6, src: image6, name: "Книготорговцы" },
    { id: 7, src: image7, name: "Когда я думаю о Германии ночью" },
    { id: 8, src: image8, name: "Gimme Danger: История Игги и The Stooges" },
    { id: 9, src: image9, name: "Дженис: Маленькая девочка грустит" },
    { id: 10, src: image10, name: "Соберись перед прыжком" },
    { id: 11, src: image11, name: "Пи Джей Харви: A dog called money" },
    { id: 12, src: image12, name: "По волнам: Искусство звука в кино" },
  ];

  const savedCards =[
    { id: 1, src: image1, name: "33 слова о дизайне" },
    { id: 2, src: image2, name: "Киноальманах «100 лет дизайна»" },
    { id: 3, src: image3, name: "В погоне за Бенкси" },
  ]

function MoviesCardList({cardsSettings}) {

  function renderCardList(arr) {
    return arr.map((card) => {
      return (<MoviesCard key={card.id} card={card} />);
    })
  }
  
  return (
    <section className="cards">
      <ul className="cards__list">
        {cardsSettings === "allCards" ? renderCardList(cards) : renderCardList(savedCards)}
      </ul>
      <button className={`cards__btn ${cardsSettings !== "allCards" && "cards__btn_visibility_hidden"}`}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
