class Api {
  constructor(options) {
    this.url = options.baseUrl;
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

  _giveHeaders() {
    const token = localStorage.getItem('token');
    const newHeaderObj = {authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'};
    return newHeaderObj;
  }

  // метод получения информации о пользователе с сервера
  getUser() {
    return this._request(`${this.url}/users/me`, {
      headers: {...this._giveHeaders()},
    })
  }

  // запрос карточек
  getInitialCards() {
    return this._request(`${this.url}/cards`, {
      headers: {...this._giveHeaders()},
      
    })
  }

  editUser(inputData) {  //методом PATCH
    return this._request(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {...this._giveHeaders()},
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
  }

  addNewCard(inputData) {    //методом POST
    return this._request(`${this.url}/cards`, {
      method: 'POST',
      headers: {...this._giveHeaders()},
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {...this._giveHeaders()},
    })
  }

  addLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {...this._giveHeaders()},
    })
  }

  deleteLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {...this._giveHeaders()},
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.deleteLike(cardId)
  }

  changeAvatar(inputData) {
    return this._request(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {...this._giveHeaders()},
      body: JSON.stringify({
        avatar: inputData.avatar, //avatarUrl
      }),
    })
  }
}

export const api = new Api({
  baseUrl: 'http://51.250.84.140:3001',
  
});