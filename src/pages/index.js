import './index.css';
import { openModal, closeModal } from '../components/modals.js';
import { 
  checkInputValidity, 
  hideInputError, 
  toggleButtonState 
} from '../components/validate.js';

import avatarImg from '../images/avatar.jpg';
document.getElementById('avatar-img').src = avatarImg;

import logoImg from '../images/logo.svg';
document.getElementById('logo-img').src = logoImg;

import { updateUserInfo, addCard, getUserInfo, getInitialCards, deleteCard, likeCard, unlikeCard, updateUserAvatar } from '../utils/utils.js';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Профиль
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileFormElement.querySelector('#popup__input_type_name');
const jobInput = profileFormElement.querySelector('#popup__input_type_description');

// Обработчик открытия формы профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  checkInputValidity(profileFormElement, nameInput);
  checkInputValidity(profileFormElement, jobInput);

  const inputList = Array.from(profileFormElement.querySelectorAll('.popup__input'));
  const button = profileFormElement.querySelector('.popup__button');
  toggleButtonState(inputList, button);

  openModal(profilePopup);
});

// Обработчик сохранения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  updateUserInfo(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.error('Ошибка обновления профиля:', err);
    });
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Кнопка закрытия попапа профиля
profilePopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(profilePopup);
});

// Добавление карточки
const addCardButton = document.querySelector('.profile__add-button');
const cardFormElement = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

// Открытие попапа добавления карточки
addCardButton.addEventListener('click', () => {
  cardFormElement.reset();

  const cardName = cardFormElement.querySelector('.popup__input_type_card-name');
  const cardUrl = cardFormElement.querySelector('.popup__input_type_url');

  hideInputError(cardFormElement, cardName);
  hideInputError(cardFormElement, cardUrl);
  
  const inputList = Array.from(cardFormElement.querySelectorAll('.popup__input'));
  const button = cardFormElement.querySelector('.popup__button');
  toggleButtonState(inputList, button);

  openModal(cardPopup);
});

// Обработка отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCard = createCard(cardData, currentUserId);
      cardsContainer.prepend(newCard);
      closeModal(cardPopup);
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    });
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Кнопка закрытия попапа добавления карточки
cardPopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(cardPopup);
});


// @todo: Функция создания карточки
function createCard(cardData, userId) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Удаление карточки
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      deleteCardFromServer(cardData._id)
        .then(() => cardElement.remove())
        .catch((err) => console.error('Ошибка удаления карточки:', err));
    });
  }

  // Лайк
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    if (isLiked) {
      unlikeCard(cardData._id)
        .then(updatedCard => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch(err => console.error('Ошибка снятия лайка:', err));
    } else {
      likeCard(cardData._id)
        .then(updatedCard => {
          likeButton.classList.add('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch(err => console.error('Ошибка постановки лайка:', err));
    }
  });

  // Открытие попапа с картинкой
  cardImage.addEventListener('click', () => {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openModal(imagePopup);
  });

  return cardElement;
}

// Кнопка закрытия попапа с изображением
imagePopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(imagePopup);
});

// Функция удаления карточки
function deleteCardFromServer(cardId) {
  return deleteCard(cardId);
}


// @todo: Информация о пользователе и аватаре
let currentUserId = '';
const profileAvatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar-link');
const avatarSubmitButton = avatarForm.querySelector('.popup__button');

// Получение информации о пользователе
getUserInfo()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    const avatarImg = document.querySelector('#avatar-img');
    avatarImg.src = userData.avatar;


    currentUserId = userData._id;
  })
  .catch((err) => {
    console.error('Ошибка загрузки информации о пользователе:', err);
  });

// Изменение аватара
function clearValidation(form) {
  form.reset();
}

// Обработчик клика по аватару — открыть попап
profileAvatar.addEventListener('click', () => {
  clearValidation(avatarForm);
  openModal(avatarPopup);
});

// Обработчик сабмита формы аватара
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const avatarUrl = avatarInput.value;

  updateUserAvatar(avatarUrl)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error('Ошибка обновления аватара:', err);
      alert('Не удалось обновить аватар');
    });
});

// Кнопка закрытия попапа аватара
avatarPopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(avatarPopup);
});


// @todo: Вывести карточки на страницу
// Загрузка карточек
getInitialCards()
  .then((cards) => {
    cards.forEach(card => {
      const cardElement = createCard(card, currentUserId);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка загрузки карточек:', err);
  });