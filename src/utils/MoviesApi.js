class MoviesApi {
  constructor({ adress }) {
    this._adress = adress;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._adress).then((res) => {
      return this._checkResponseStatus(res);
    });
  }
}

const moviesApi = new MoviesApi({
  adress: "https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;
