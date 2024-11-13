import getElement from './Get Element.js';

const toggle = getElement('.nav-toggle');
// navigation
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

const navLinks = document.querySelectorAll('.nav-link');
const sub = document.querySelector('.submenu');
const navbar = document.querySelector('.navbar');

//submenu
const submenu = () => {
  navLinks.forEach((link) => {
    link.addEventListener('mouseover', (e) => {
      {
        const elementText = e.currentTarget.textContent;

        if (elementText === 'Shop') {
          const element = e.currentTarget.getBoundingClientRect();
          const elementHeight = element.height;
          const center = (element.left + element.right - 240) / 2;
          const bottom = element.bottom - 3;
          sub.classList.add('show');
          sub.style.left = `${center}px`;
          sub.style.top = `${bottom}px`;
        } else {
          sub.classList.remove('show');
        }
      }
    });
  });
  navbar.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('nav-link')) {
      sub.classList.remove('show');
    }
  });
};

//note for micanje poruke nakon ispunjenje forme
const note = (section, formAlert, message) => {
  setTimeout(() => {
    section.style.display = 'none';
    formAlert.classList.remove(message);
  }, 2000);
};

//paginataion
const pagination = (array) => {
  const itemsPerPage = 15;
  const numberOfPages = Math.ceil(array.length / itemsPerPage);
  const newArray = Array.from({ length: numberOfPages }, (_, index) => {
    const start = itemsPerPage * index;
    return array.slice(start, start + itemsPerPage);
  });
  return newArray;
};

const btnsPag = (array, container) => {
  container.innerHTML = array
    .map((_, index) => {
      let classSelected = 'selected';
      if (index === 0) {
        classSelected = 'selected';
      } else {
        classSelected = 'null';
      }
      return `<button class="btn-pagination ${classSelected}">${
        index + 1
      }</button>`;
    })
    .join('');
};

const btns = document.querySelectorAll('.btn-pagination');
btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btns.forEach((btn) => {
      btn.classList.remove('selected');
    });
    btn.classList.add('selected');
    section.innerHTML = uniqueProduct(pagination(photos), index);
    initializeGallery();
  });
});

export { note };
export { submenu };
export { navigation };
export { pagination };
export { btnsPag };
