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
      return card.duration <=40
    } else {
      return card;
    }
  });

  return filteredCards;
}

export function filter(cards, value, isChecked) {
  console.log(cards);
  let filteredCards = filterByDuration(cards, isChecked);
  console.log(filteredCards);
  return filterByName(filteredCards, value);
}
