class Api {
  constructor({ adress, token }) {
    this._adress = adress;
    this._token = `Bearer ${token}`;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

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
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  getSavedMovies(jwt) {
    return fetch(this._adress + "/movies", {
      headers: {
        authorization: `Bearer ${jwt}`,
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


export default Api;
