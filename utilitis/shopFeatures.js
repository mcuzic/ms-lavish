import getElement from './Get Element.js';
import products from './products.js';
import { btnsPag } from './shared.js';
import { pagination } from './shared.js';

const shopContainer = getElement('.shop-container');
const shopImg = getElement('.shop-img');
const prices = getElement('.price');
const filterButtons = getElement('.filter-buttons');
const searchInput = getElement('.search-input');
const form = getElement('.input-form');
const featurePrice = getElement('.featured-price');
const btnContShop = getElement('.btn-container-shop');

//pagination
pagination(products);

//btnPag
btnsPag(pagination(products), btnContShop);

const displayProducts = (array, index) => {
  shopContainer.style.display = 'grid';
  shopContainer.innerHTML = array[index]
    .map((product) => {
      const { id, image, price, title, featured, featuredPrice } = product;
      let displayedPrice = price;
      let prices = 'price';
      let featurePrice = 'featured-price ';
      if (featured) {
        displayedPrice = featuredPrice;
        prices = 'price price-strike';
      } else {
        featurePrice = 'featured-price feature-none';
      }
      return `  <a href="product.html?id=${id}" class="shop-product">
            <div class="image-shop-container">
              <img src="${image}" class="shop-img" />
            </div>
            <div class="shop-info">
              <p class="title">${title}</p>
              <p class="${prices}">€ ${price}</p>  
              <p class="${featurePrice}">€${displayedPrice}</p>                                     
            </div>
          </a>`;
    })
    .join('');
};
const displayProduct = (array) => {
  shopContainer.style.display = 'grid';
  if (array.length < 4) {
    shopContainer.classList.add('hero-shop');
  }
  if (array.length < 1) {
    shopContainer.classList.add('hero-shop');
    shopContainer.style.display = 'block';
    shopContainer.innerHTML =
      '<h3 class="no-product">Sorry, no products matched your search</h3>';
    return;
  }
  shopContainer.innerHTML = array
    .map((product) => {
      const { id, image, price, title, featured, featuredPrice } = product;
      let displayedPrice = price;
      let prices = 'price';
      let featurePrice = 'featured-price ';
      if (featured) {
        displayedPrice = featuredPrice;
        prices = 'price price-strike';
      } else {
        featurePrice = 'featured-price feature-none';
      }
      return `  <a href="product.html?id=${id}" class="shop-product">
            <div class="image-shop-container">
              <img src="${image}" class="shop-img" />
            </div>
            <div class="shop-info">
              <p class="title">${title}</p>
              <p class="${prices}">€ ${price}</p>  
              <p class="${featurePrice}">€${displayedPrice}</p>                                     
            </div>
          </a>`;
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
    displayProducts(pagination(products), index);
  });
});
//btns pagination

//displayButtons
const displayButtons = (array) => {
  const newButtons = array.map((buttons) => {
    return buttons.product;
  });
  const newBtns = ['all', ...new Set(newButtons)];

  filterButtons.innerHTML = newBtns
    .map((btn) => {
      return `<button class="filter-btn" data-id="${btn}">${btn}</button>`;
    })
    .join('');
  const filterBtn = filterButtons.querySelectorAll('.filter-btn');
  filterBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      if (shopContainer.classList.contains('hero-shop')) {
        shopContainer.classList.remove('hero-shop');
        shopContainer.style.display = 'grid';
      }
      const category = e.currentTarget.dataset.id;
      const MenuCategory = array.filter((item) => {
        if (category === item.product) {
          return item;
        }
      });
      if (category === 'all') {
        displayProduct(array);
      } else {
        displayProduct(MenuCategory);
      }
      searchInput.value = '';
    });
  });
};

//search

const search = (array) => {
  form.addEventListener('keyup', () => {
    if (!searchInput.value) return;
    const inputValue = searchInput.value.toLowerCase();
    const filterProducts = array.filter((product) => {
      return product.title.toLowerCase().includes(inputValue);
    });
    displayProduct(filterProducts);
  });
};

export { displayProducts, displayButtons, search };
