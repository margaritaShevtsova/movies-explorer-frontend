class Api {
  constructor({ adress }) {
    this._adress = adress;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  logout() {
    return fetch(this._adress + "/signout", {
      credentials: "include",
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  getUserInfo() {
    return fetch(this._adress + "/users/me", {
      // credentials: 'include',
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  setUserInfo({ name, email }) {
    return fetch(this._adress + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  getSavedMovies() {
    return fetch(this._adress + "/movies", {
      credentials: "include",
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  postMovie({
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
    return fetch(this._adress + "/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
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
      }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  deleteMovie(cardId) {
    return fetch(this._adress + "/movies/" + cardId, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }
}

const api = new Api({
  adress: "https://shevtsova.movies.nomoreparties.sbs/api",
});

export default api;
