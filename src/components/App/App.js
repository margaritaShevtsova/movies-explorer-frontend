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
import api from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

const token = localStorage.getItem("jwt") || "";

function App() {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedCards, setSavedCards] = React.useState([]);
  const [successCardRequest, setSuccessCardRequest] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(token);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, []);

  function getSavedMovies() {
    api
      .getSavedMovies()
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
        checkToken().then(() => {
          getSavedMovies();
        });
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            navigate("/movies", { replace: true });
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
        console.log(res);
        setSuccessCardRequest(true);
        setSavedCards([...savedCards, res]);
      })
      .then(() => {
        console.log(savedCards);
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
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="*" element={<NotFound />} />
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
