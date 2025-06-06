const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: '2019b335-80c7-44ca-8b1a-9a47dc8dca6a',
      'Content-Type': 'application/json'
    }
  };
  
  // Получение информации о пользователе
  export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
  
  // Загрузка карточек
  export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  // Обноваление информации о пользователе
  export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about })
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  // Добавление карточки
  export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link })
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
  
  // Удаление карточки
  export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
  
  // Постановка лайка
  export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  // Снятие лайка
  export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
  
  // Обновление нового аватара
  export function updateUserAvatar (avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar })
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
  