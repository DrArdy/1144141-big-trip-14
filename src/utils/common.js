const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const setInputError = (inputField, message) => {
  inputField.setCustomValidity(message);
  inputField.style.borderColor = 'red';
  inputField.reportValidity();
  return;
};

const resetInputError = (inputField) => {
  inputField.setCustomValidity('');
  inputField.style.borderColor = '';
};

export {getRandomInteger, setInputError, resetInputError};
