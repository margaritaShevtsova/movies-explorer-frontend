import { shortFilmDuration } from "../constants/constants";

function filterByName(cards, value) {
  const filteredCards = cards.filter((card) => {
    return (
      card.nameRU.toLowerCase().includes(value.toLowerCase()) ||
      card.nameEN.toLowerCase().includes(value.toLowerCase())
    );
  });

  return filteredCards;
}

function filterByDuration(cards, isChecked) {
  const filteredCards = cards.filter((card) => {
    if(isChecked) {
      return card.duration <= shortFilmDuration
    } else {
      return card;
    }
  });

  return filteredCards;
}

export function filter(cards, value, isChecked) {
  let filteredCards = filterByDuration(cards, isChecked);
  return filterByName(filteredCards, value);
}
