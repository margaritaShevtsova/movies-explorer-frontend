import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(onHandleChange) {
  return (
    <div className="checkbox__wrapper">
      <input
        className="checkbox"
        id="check"
        type="checkbox"
        defaultChecked={true}
        onChange={() => onHandleChange}
      />
      <label htmlFor="check" className="checkbox__label">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;