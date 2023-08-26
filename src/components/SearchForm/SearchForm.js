import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/useForm";

function SearchForm({
  handleSearch,
  handleCheckboxChange,
  handleCheckboxChangeSaved,
  isChecked,
  searchValue,
  isLoading,
  cardsSettings,
}) {
  const {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation();

  const [isSearchValue, setIsSearchValue] = useState(false);

  useEffect(()=> {
    setValues({search: searchValue});
    if(searchValue) {
      setIsSearchValue(true);
    }
  },[]);

  function handleInputChange(e) {
    handleChange(e);
    setIsSearchValue(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(values.search);
  }

  function handleCheckboxClick () {
    handleCheckboxChangeSaved(values.search);
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__wrapper">
            <input
              defaultValue={searchValue}
              onChange={handleInputChange}
              className="search__input"
              name="search"
              type="text"
              placeholder="Фильм"
              required
              maxLength="60"
              minLength="1"
            />
            <span className="search__error">
              {errors.search && "Нужно ввести ключевое слово"}
            </span>
            <button
              className="search__btn"
              type="submit"
              disabled={(!isValid && isSearchValue) ? false : (!isValid && !isSearchValue) || isLoading ? true : false}
            ></button>
          </div>
          <FilterCheckbox
            onHandleChange={cardsSettings === "savedCards" ? handleCheckboxClick : handleCheckboxChange}
            isChecked={isChecked}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
