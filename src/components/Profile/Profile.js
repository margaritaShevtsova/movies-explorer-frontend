import React, {useState, useEffect} from "react";
import "./Profile.css";
import Header from "../Header/Header";

function Profile({ isLoggedin, name, email }) {
  const [values, setValues] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setValues({ profileName: name, profileEmail: email });
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaved(!isSaved)
  }
  return (
    <>
      <Header isLoggedin={isLoggedin} />
      <div className="profile">
      <h2 className="profile__title">Привет, {values.profileName}!</h2>
      <form className="profile__form">
        <div className="profile__wrapper">
          <div className="profile__block">
            <label className="profile__label" htmlFor="inputName">Имя</label>
            <input
              className="profile__input"
              onChange={handleInputChange}
              id="inputName"
              value={values.profileName || ""}
              required
              name="profileName"
              disabled={!isSaved ? "disabled" : ""}
            />
          </div>
          <div className="profile__block">
            <label className="profile__label" htmlFor="inputEmail">E-mail</label>
            <input
              className="profile__input"
              onChange={handleInputChange}
              id="inputEmail"
              value={values.profileEmail || ""}
              required
              name="profileEmail"
              disabled={!isSaved ? "disabled" : ""}
            />
          </div>
        </div>
        <button className="profile__edit-btn" onClick={handleSubmit}>{!isSaved ? "Редактировать" : "Сохранить"}</button>
      </form>
      <button className="profile__exit-btn">Выйти из аккаунта</button>
    </div>
    </>
  );
}

export default Profile;
