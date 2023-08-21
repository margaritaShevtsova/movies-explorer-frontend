import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

function SearchForm({handleSearch, handleCheckboxChange, isChecked, searchValue}) {

  const [formValue, setFormValue] = useState({search: searchValue});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(formValue.search);
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__wrapper">
            <input
              defaultValue={searchValue}
              onChange={handleChange}
              className="search__input"
              name="search"
              type="text"
              placeholder="Фильм"
              required
              maxLength="60"
              minLength="1"
            />
            <button className="search__btn" type="submit"></button>
          </div>
          <FilterCheckbox onHandleChange={handleCheckboxChange} isChecked={isChecked}/>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
