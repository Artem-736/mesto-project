// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Универсальные функции открытия/закрытия попапов
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

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

// Функции валидации полей
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  }
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  }
  
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = getErrorMessage(inputElement);
      showInputError(formElement, inputElement, errorMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }
  
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_disabled');
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('popup__button_disabled');
      buttonElement.disabled = false;
    }
  }
  
  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }

  function getErrorMessage(inputElement) {
    if (inputElement.validity.valueMissing) {
      return 'Вы пропустили это поле.';
    }
    if (inputElement.validity.tooShort) {
      return `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length} символ${inputElement.value.length === 1 ? '' : 'а'}.`;
    }
    return inputElement.validationMessage;
  }
  
  
enableValidation();
