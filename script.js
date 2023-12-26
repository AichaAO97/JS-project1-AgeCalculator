const inputElements = document.querySelectorAll('.card__input');
const submitButton = document.querySelector('.card__button');

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true
  }
  // return false; // we don't need this because it "else" it will return undefined which is a falsy value
};

const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true
  }
};

const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true
  }
};

const isDateValid = (dayElement, monthElement, yearElement) => {
  let isValid = [false, false, false];

  if (!validateDay(dayElement.value)) {
    dayElement.classList.add('card__input--error');
  } else {
    isValid[0] = true;
    dayElement.classList.remove('card__input--error');
  }

  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add('card__input--error');
  } else {
    isValid[1] = true;
    monthElement.classList.remove('card__input--error');
  }

  if (!validateYear(yearElement.value)) {
    yearElement.classList.add('card__input--error');
  } else {
    isValid[2] = true;
    yearElement.classList.remove('card__input--error');
  }

  return isValid.every(item => item === true);

};

const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthday = new Date(year, month - 1, day);
  const age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  const dayDiff = today.getDate() - birthday.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return age - 1;
  }
  return age;
}

const onClickHandler = () => {
  const day = document.querySelector('.card__input[name="day"]');
  const month = document.querySelector('.card__input[name="month"]');
  const year = document.querySelector('.card__input[name="year"]');
  const result = document.querySelector('.card__resultValue');

  if (!isDateValid(day, month, year)) {
    result.textContent = '--';
    return;
  }

  result.textContent = calculateAge(year, month, day);
};

submitButton.addEventListener('click', onClickHandler);

inputElements.forEach((item) => {
  item.addEventListener('keydown', event => event.key === "Enter" && onClickHandler());
});