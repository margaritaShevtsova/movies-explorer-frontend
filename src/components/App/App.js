import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoToolTip/InfoToolTip";

function App() {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const closeAllPopups = () => {
    setIsTooltipOpen(false);
    setIsSuccess(false);
  };


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main isLoggedin={false} />} />
        <Route path="/movies" element={<Movies isLoggedin={true} />} />
        <Route
          path="/saved-movies"
          element={<SavedMovies isLoggedin={true} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              isLoggedin={true}
              name="Виталий"
              email="pochta@yandex.ru"
            />
          }
        />
        <Route path="/signup" element={<Register/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isTooltipOpen}
            isSuccess={isSuccess}
          />
    </div>
  );
}

export default App;
