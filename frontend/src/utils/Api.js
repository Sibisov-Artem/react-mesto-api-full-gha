class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  // метод получения информации о пользователе с сервера
  getUser() {
    return this._request(`${this.url}/users/me`, {
      headers: this.headers
    })
  }

  // запрос карточек
  getInitialCards() {
    return this._request(`${this.url}/cards`, {
      headers: this.headers
    })
  }

  editUser(inputData) {  //методом PATCH
    return this._request(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
  }

  addNewCard(inputData) {    //методом POST
    return this._request(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

  addLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
  }

  deleteLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.deleteLike(cardId)
  }

  changeAvatar(inputData) {
    return this._request(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: inputData.avatar, //avatarUrl
      }),
    })
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:4000',
  headers: {
    authorization: localStorage.getItem('token'), //мой токен // localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
});