import { navigation } from './shared.js';
import getElement from './Get Element.js';
import people from './people.js';
import faqItems from './faqItems.js';
navigation();

// select values review
const items = document.querySelectorAll('.faq-item');
const btns = document.querySelectorAll('.faq-btns');

const slideContainer = getElement('.slide-container');
const previous = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');

//Reviews

slideContainer.innerHTML = people
  .map((person, index) => {
    let position = 'next';
    const { image, name, product, text } = person;
    if (index === 0) {
      position = 'active';
    }
    if (index === people.length - 1) {
      position = 'last';
    }
    return `<div class="slide-review ${position}">
            <div class="img-review-container">
              <img
                src="${image}"
                class="img-review"
              />
            </div>
            <h5 class="review-name">${name}</h5>
            <p class="review-product-title">${product}</p>
            <span class="quote">
              <i class="fas fa-quote-right"></i>
            </span>
            <p class="review-text">
            ${text}
            </p>
          </div>`;
  })
  .join('');

const slideNext = (container) => {
  const active = container.querySelector('.active');
  let next = active.nextElementSibling;
  const last = container.querySelector('.last');
  if (!next) {
    next = container.firstElementChild;
  }
  //add class
  active.classList.remove('active');
  next.classList.remove('next');
  last.classList.remove('last');
  active.classList.add('last');
  next.classList.add('active');
  last.classList.add('next');
};

const slidePrev = (container) => {
  let last = container.querySelector('.last');
  let next = last.previousElementSibling;
  let active = last.nextElementSibling;
  if (!next) {
    next = container.lastElementChild;
  }
  if (!active) {
    active = container.firstElementChild;
  }
  last.classList.remove('last');
  active.classList.remove('active');
  next.classList.remove('next');

  active.classList.add('next');
  last.classList.add('active');
  next.classList.add('last');
};

next.addEventListener('click', () => {
  slideNext(slideContainer);
});
previous.addEventListener('click', () => {
  slidePrev(slideContainer);
});

// faq

const btnLeft = getElement('.arrow-left');
const btnRight = getElement('.arrow-right');
const faqImage = getElement('.faq-image');
const faqContainer = getElement('.faq-container');
const numberOne = getElement('.faq-number-one');

const faqTitle = document.querySelectorAll('.faq-question-title');
const faqQuestions = getElement('.faq-questions');
const faqText = getElement('.faq-info-text');

window.addEventListener('DOMContentLoaded', () => {
  displayQuestion();
});

let count = 1;
const mainFaq = faqItems.slice(0, 3);

faqContainer.innerHTML = mainFaq
  .map((main, index) => {
    let position = 'next';
    const { image } = main;
    if (index === 0) {
      position = 'active';
    }
    if (index === mainFaq.length - 1) {
      position = 'last';
    }
    return `  <img src="${image}" class="faq-image ${position}" />`;
  })
  .join('');

const displayQuestion = () => {
  faqQuestions.innerHTML = mainFaq
    .map((faq, index) => {
      const { title } = faq;
      let position = 'active';

      if (index === 0) {
        position = 'active';
      } else {
        position = 'null';
      }
      return `<div class="faq-question ${position}">
                <btn class="faq-question-title">${title}</btn>
                <div class="sale-line ${position} "></div>
              </div>`;
    })
    .join('');

  faqText.innerHTML = `<div class="faq-info-text">
              <h3 class="faq-header">${mainFaq[0].title}</h3>
              <p class="faq-text">
                ${mainFaq[0].text}
              </p>
            </div>`;

  // buttons

  const qbtns = faqQuestions.querySelectorAll('.faq-question-title');
  qbtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const el = e.currentTarget;
      const sL = e.currentTarget.nextElementSibling;
      if (sL.classList.contains('active')) {
        return;
      } else {
        slideNext(faqContainer);
      }
      const saleL = faqQuestions.querySelectorAll('.sale-line');
      saleL.forEach((sale) => {
        sale.classList.remove('active');
        sL.classList.add('active');
      });
      const newArray = mainFaq.filter((faq) => {
        if (el.innerHTML === faq.title) {
          return faq;
        }
      });
      faqText.innerHTML = `<div class="faq-info-text">
              <h3 class="faq-header">${newArray[0].title}</h3>
              <p class="faq-text">
                ${newArray[0].text}
              </p>
            </div>`;
      count = newArray[0].numb;
      numberOne.innerHTML = count;
    });
  });
};

//faq function
const faq = () => {
  const saleL = faqQuestions.querySelectorAll('.sale-line');
  saleL.forEach((line, index) => {
    if (index === count - 1) {
      line.classList.add('active');
    } else {
      line.classList.remove('active');
    }
  });
  faqText.innerHTML = `<div class="faq-info-text">
              <h3 class="faq-header">${mainFaq[count - 1].title}</h3>
              <p class="faq-text">
                ${mainFaq[count - 1].text}
              </p>
            </div>`;
};

//saleLines function

btnRight.addEventListener('click', () => {
  slideNext(faqContainer);
  count++;
  if (count > 3) {
    count = 1;
  }
  numberOne.innerHTML = count;
  faq();
});

btnLeft.addEventListener('click', () => {
  slidePrev(faqContainer);
  count--;
  if (count === 0) {
    count = 3;
  }
  numberOne.innerHTML = count;
  faq();
});

//faq additional questions

const additionalQ = document.querySelectorAll('.question');
const additionalBtns = document.querySelectorAll('.question-btn');

additionalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const questionElement = e.currentTarget.parentNode.parentNode;
    additionalQ.forEach((question) => {
      if (question !== questionElement) {
        question.classList.remove('show-text');
      }
    });
    questionElement.classList.toggle('show-text');
  });
});
