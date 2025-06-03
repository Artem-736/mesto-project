// Функции валидации полей
export function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  }
  
  export function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  }
  
  export function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = getErrorMessage(inputElement);
      showInputError(formElement, inputElement, errorMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  
  export function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }
  
  export function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_disabled');
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('popup__button_disabled');
      buttonElement.disabled = false;
    }
  }
  
  export function setEventListeners(formElement) {
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
  
  export function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }

  export function getErrorMessage(inputElement) {
    if (inputElement.validity.valueMissing) {
      return 'Вы пропустили это поле.';
    }
    if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
      return 'Введите адрес сайта.';
    }
    if (inputElement.validity.tooShort) {
      return `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length} символ${inputElement.value.length === 1 ? '' : 'а'}.`;
    }
    return inputElement.validationMessage;
  }
  
enableValidation();