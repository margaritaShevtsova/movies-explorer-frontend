class Api {
  constructor({ adress, token }) {
    this._adress = adress;
    this._token = token;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // logout() {
  //   return fetch(this._adress + "/signout", {
  //     credentials: "include",
  //     redirect:"follow"
  //   }).then((res) => {
  //     return this._checkResponseStatus(res);
  //   });
  // }

  getUserInfo() {
    return fetch(this._adress + "/users/me", {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  setUserInfo({ name, email }) {
    return fetch(this._adress + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
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
      headers: {
        authorization: this._token,
      },
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
        authorization: this._token,
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
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }
}

const token = localStorage.getItem("jwt") || "";

const api = new Api({
  adress: "https://shevtsova.movies.nomoreparties.sbs/api",
  token: token
});

export default api;
