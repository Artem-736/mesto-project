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
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

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
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
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
  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  });
  cardsContainer.prepend(newCard);
  closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Кнопка закрытия попапа добавления карточки
cardPopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(cardPopup);
});

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Удаление карточки
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  // Лайк
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
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

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsContainer.append(cardElement);
});

