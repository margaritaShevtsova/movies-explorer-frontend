import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

function SearchForm() {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__wrapper">
            <input
              className="search__input"
              name="search"
              type="text"
              placeholder="Фильм"
            />
            <button className="search__btn"></button>
          </div>
          <FilterCheckbox onHandleChange={handleChange} />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
