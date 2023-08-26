import React, { useState, useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile({ isLoggedIn, handleSetUserInfo, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    values,
    setValues,
    handleChange,
    resetForm,
    errors,
    isValid,
  } = useFormWithValidation();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isSaved) {
      setIsSaved(!isSaved);
    } else {
      handleSetUserInfo(values.name, values.email);
      setIsSaved(!isSaved);
    }
  }
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form">
          <div className="profile__wrapper">
            <div className="profile__block">
              <label className="profile__label" htmlFor="inputName">
                Имя
              </label>
              <input
                className="profile__input"
                onChange={handleChange}
                value={values.name || ""}
                id="inputName"
                type="text"
                minLength="2"
                maxLength="40"
                required
                name="name"
                disabled={!isSaved ? "disabled" : ""}
              />
              <span className="profile__error">{errors.name}</span>
            </div>
            <div className="profile__block">
              <label className="profile__label" htmlFor="inputEmail">
                E-mail
              </label>
              <input
                className="profile__input"
                onChange={handleChange}
                value={values.email || ""}
                id="inputEmail"
                type="email"
                minLength="2"
                maxLength="40"
                required
                name="email"
                disabled={!isSaved ? "disabled" : ""}
              />
              <span className="profile__error">{errors.email}</span>
            </div>
          </div>
          <button
            className="profile__edit-btn"
            onClick={handleSubmit}
            disabled={
              !isValid ||
              (isSaved && (currentUser.name === values.name &&
                currentUser.email === values.email))
            }
          >
            {!isSaved ? "Редактировать" : "Сохранить"}
          </button>
        </form>
        <button className="profile__exit-btn" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </div>
    </>
  );
}

export default Profile;
