import {
  displayProducts,
  displayButtons,
  search,
} from '../utilitis/Display products.js';
import products from '../utilitis/products.js';

// ********** nav toggle ************
// select button and links
const navBtn = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
//seleect date
const date = document.getElementById('date');
const newDate = new Date().getFullYear();
date.innerHTML = `${newDate} All Rights Reserved `;
const input = document.getElementById('contact-input');
const submit = document.getElementById('submit');

// add event listener
navBtn.addEventListener('click', () => {
  links.classList.toggle('show-links');
});
// ********** navbar fixed ************
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 62) {
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // prevent default
    e.preventDefault();
    links.classList.remove('show-links');

    const id = e.target.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    //
    let position;
    if (navbar.classList.contains('fixed')) {
      position = element.offsetTop - 62;
    } else {
      position = element.offsetTop - 124;
    }
    if (window.innerWidth < 992) {
      if (navbar.classList.contains('fixed')) {
        position = element.offsetTop - 62;
      } else {
        position = element.offsetTop - 332 - 62;
      }
    }
    window.scrollTo({
      left: 0,
      // top: element.offsetTop,
      top: position,
      behavior: 'smooth',
    });
  });
});

// products

displayProducts(products);
displayButtons(products);
search(products);
