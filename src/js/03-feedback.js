import throttle from 'lodash.throttle';

const contactFormEl = document.querySelector('.feedback-form');
const userData = {};

const fillContactFormField = () => {
  const userDataFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (userDataFromLS === null) {
    return;
  }

  for (const key in userDataFromLS) {
    if (userDataFromLS.hasOwnProperty(key)) {
      contactFormEl.elements[key].value = userDataFromLS[key];
      if (userDataFromLS[key]) {
        userData[key] = userDataFromLS[key];
      }
    }
  }
};

fillContactFormField();

const onContactFormFieldChange = ({ target: contactFormField }) => {
  const contactFormFieldValue = contactFormField.value;
  const contactFormFieldName = contactFormField.name;
  console.log('userData: ', userData);

  userData[contactFormFieldName] = contactFormFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};

const onContactFormSubmit = event => {
  event.preventDefault();

  console.log(userData);

  contactFormEl.reset();
  localStorage.removeItem('feedback-form-state');

  userData = {};
};

contactFormEl.addEventListener(
  'input',
  throttle(onContactFormFieldChange, 500)
);
contactFormEl.addEventListener('submit', onContactFormSubmit);
