import "./App.css";
import React, { useEffect } from "react";
import {
  CurrentUserContext,
  SavedMoviesContext,
} from "../../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import Api from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import { useNavigate, Navigate } from "react-router-dom";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedCards, setSavedCards] = React.useState([]);
  const [successCardRequest, setSuccessCardRequest] = React.useState(false);
  const navigate = useNavigate();

  let token = localStorage.getItem("jwt") || "";
  const api = new Api({
    adress: "https://shevtsova.movies.nomoreparties.sbs/api",
    token: token
  });

  let windowPath = window.location.pathname;

  useEffect(() => {
    checkToken(token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies(token);
    }
  }, [isLoggedIn]);

  function getSavedMovies(token) {
    return api
      .getSavedMovies(token)
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => console.error(err));
  }

  function handleRegister(password, email, name) {
    return auth
      .register(password, email, name)
      .then(() => {
        handleLogin(password, email);
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
        setIsLoggedIn(false);
      });
  }

  function handleLogin(password, email) {
    return auth
      .authorize(password, email)
      .then((res) => {
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
        checkToken();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    token = jwt;
    if (jwt) {
      return auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(`${windowPath}`, {replace: true});
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
    }
  }

  function addSavedMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    return api
      .postMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      })
      .then((res) => {
        setSuccessCardRequest(true);
        setSavedCards([...savedCards, res]);
      })
      .catch((err) => {
        setSuccessCardRequest(false);
        console.error(err);
      });
  }

  function handleDeleteMovie(card) {
    return api
      .deleteMovie(card._id)
      .then(() => {
        setSuccessCardRequest(true);
        setSavedCards(() => {
          return savedCards.filter((item) => {
            return item._id !== card._id;
          });
        });
      })
      .catch((err) => {
        setSuccessCardRequest(false);
        console.error(err);
      });
  }

  function setUserInfo(name, email) {
    api
      .setUserInfo({ name: name, email: email })
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
        setIsSuccess(true);
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
    console.log("Вы успешно вышли из аккаунта");
  }

  const closeAllPopups = () => {
    setIsTooltipOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedCards}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={<Main isLoggedIn={isLoggedIn} activeItem="none" />}
            />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  element={
                    <Movies
                      isLoggedIn={isLoggedIn}
                      handleAddMovie={addSavedMovie}
                      handleDeleteMovie={handleDeleteMovie}
                      isSavedCards={false}
                      savedCards={savedCards}
                      successCardRequest={successCardRequest}
                      activeItem="movies"
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={
                    <SavedMovies
                      isLoggedIn={isLoggedIn}
                      isSavedCards={true}
                      handleDeleteMovie={handleDeleteMovie}
                      successCardRequest={successCardRequest}
                      activeItem="saved-movies"
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={
                    <Profile
                      isLoggedIn={isLoggedIn}
                      handleSetUserInfo={setUserInfo}
                      handleLogout={handleLogout}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/" replace /> : <Register handleRegister={handleRegister} />}
            />
            <Route
              path="/signin"
              element={isLoggedIn ? <Navigate to="/" replace /> : <Login handleLogin={handleLogin} />}
            />
            <Route path="*" element={<NotFound />} isLoggedIn={isLoggedIn} />
          </Routes>
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isTooltipOpen}
            isSuccess={isSuccess}
          />
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
