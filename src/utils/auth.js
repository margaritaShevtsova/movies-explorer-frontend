export const BASE_URL = "http://localhost:4000/api";


function _checkResponseStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email, name }),
  }).then((res) => {
    return _checkResponseStatus(res);
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return _checkResponseStatus(res);
  })
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then((res) => {
      return _checkResponseStatus(res);
    });
  };