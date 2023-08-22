import "./App.css";
import React, { useEffect } from "react";
import { CurrentUserContext, SavedMoviesContext } from "../../contexts/CurrentUserContext";
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

function App() {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedCards, setSavedCards] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserContent();
  }, []);

  useEffect(() => {
    getSavedMovies();
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
        navigate("/signin", { replace: true });
        getUserContent();
        setIsSuccess(true);
        setIsTooltipOpen(true);
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
        getUserContent();
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  function getUserContent() {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          navigate("/", { replace: true });
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.error(err);
      });
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
    api
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
        getSavedMovies();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDeleteMovie(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        setSavedCards((state) => {
          return state.filter((item) => {
            return item._id !== card._id;
          });
        });
      })
      .catch((err) => console.error(err));
  }

  function setUserInfo(name, email) {
    api
      .setUserInfo({ name: name, email: email })
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogout() {
    api
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/", { replace: true });
        console.log("Вы успешно вышли из аккаунта");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const closeAllPopups = () => {
    setIsTooltipOpen(false);
    setIsSuccess(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedCards}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
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
                  <SavedMovies isLoggedIn={isLoggedIn} cards={savedCards} isSavedCards={true} handleDeleteMovie={handleDeleteMovie}/>
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
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
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
