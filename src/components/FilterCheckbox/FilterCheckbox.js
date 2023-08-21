import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({onHandleChange, isChecked}) {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id="check"
        type="checkbox"
        checked={isChecked}
        onChange={onHandleChange}
      />
      <label htmlFor="check" className="checkbox__label">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;