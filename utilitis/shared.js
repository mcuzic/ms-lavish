import getElement from './Get Element.js';

const toggle = getElement('.nav-toggle');

const navigation = () => {
  const navLinks = getElement('.nav-links');
  const navContainer = getElement('.nav-container');
  const linksHeight = navLinks.getBoundingClientRect().height;

  toggle.addEventListener('click', () => {
    const containerHeight = navContainer.getBoundingClientRect().height;
    if (containerHeight === 0) {
      navContainer.style.height = `${linksHeight + 30}px`;
    } else {
      navContainer.style.height = 0;
    }
  });
};

export { navigation };
