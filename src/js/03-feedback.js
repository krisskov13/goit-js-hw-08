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

  console.log(userDataFromLS);
  console.log(contactFormEl.elements);

  for (const key in userDataFromLS) {
    if (userDataFromLS.hasOwnProperty(key)) {
      contactFormEl.elements[key].value = userDataFromLS[key];
    }
  }
};

fillContactFormField();

const onContactFormFieldChange = ({ target: contactFormField }) => {
    const contactFormFieldValue = contactFormField.value;
    const contactFormFieldName = contactFormField.name;

    userData[contactFormFieldName] = contactFormFieldValue;

    localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};

const onContactFormSubmit = event => {
  event.preventDefault();

  contactFormEl.reset();
  localStorage.removeItem('feedback-form-state');
};

contactFormEl.addEventListener('input', throttle(onContactFormFieldChange, 500));
contactFormEl.addEventListener('submit', onContactFormSubmit);
