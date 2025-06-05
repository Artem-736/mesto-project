const initialCards = [
    {
      name: 'Архыз',
      link: 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      // alt: '#'
    },
    {
      name: 'Челябинская область',
      link: 'https://images.unsplash.com/photo-1661595705828-ead987797764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80',
      // alt: '#'
    },
    {
      name: 'Иваново',
      link: 'https://images.unsplash.com/photo-1621878983992-bac95a1e8dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80   ',
      // alt: '#'
    },
    {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
      // alt: '#'
    },
    {
      name: 'Холмогорский край',
      link: 'https://images.unsplash.com/photo-1521531105925-7c51dffd5098?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80',
      // alt: '#'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80 ',
      // alt: '#'
    }
  ];

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
  