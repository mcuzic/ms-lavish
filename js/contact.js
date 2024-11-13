import getElement from '../utilitis/Get Element.js';

const contactSub = getElement('.submit-contact');
const contactInput = getElement('.contact-text');
const contactThnx = getElement('.contact-thank-you');

contactSub.addEventListener('click', (e) => {
  e.preventDefault();
  const email = contactInput.value.trim();
  if (email === '' || !email.includes('@')) {
    contactInput.style.border = '2px red solid';
  } else {
    contactThnx.style.display = 'block';
    setTimeout(() => {
      contactThnx.style.display = 'none';
      contactInput.value = '';
    }, 3000);
    contactInput.style.border = '1px solid black';
  }
});
