import getElement from './Get Element.js';
import availableProducts from './available.products.js';
import products from './products.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const showProduct = (section, array) => {
  section.classList.add('single-product-hero');
  section.innerHTML = ` <img src="${array[0].image}" class ="product-image">
      <div class="available-product">
        <div class="available-product-info">
            <div class="available-products">
              <btn class ="available-product-title">${array[0].title}</btn>
              <div class="sale-line active"></div>
            </div>
           <div class="available-products">
              <btn class ="available-product-title">Products</btn>
              <div class="sale-line"></div>
            </div>
          </div>
          <div class="available-product-about-info">
          <h2>${array[0].title}</h2>
          <p class="available-text">${array[0].text2}</p>
          <btn class="btn">Check video</btn>
          </div>
          </div>`;
};

const displayProductAvailable = () => {
  const productCenter = document.querySelector('.product-center');
  const filterAvailable = availableProducts.filter((item) => {
    if (id === item.id) {
      return item;
    }
  });

  showProduct(productCenter, filterAvailable);
  const container = productCenter.querySelector(
    '.available-product-about-info'
  );
  const availableBtn = productCenter.querySelectorAll(
    '.available-product-title'
  );

  const filterProducts = products.filter((item) => {
    if (
      item.product.toLowerCase() === filterAvailable[0].title.toLowerCase() &&
      item.featured === true
    ) {
      return item;
    }
  });

  const salesL = productCenter.querySelectorAll('.sale-line');

  availableBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      salesL.forEach((saleL) => {
        saleL.classList.remove('active');
        const element = e.currentTarget.nextElementSibling;
        element.classList.add('active');
      });
      if (btn.innerHTML === filterAvailable[0].title) {
        container.innerHTML = `<h2>${filterAvailable[0].title}</h2>
          <p class="available-text">${filterAvailable[0].text2}</p>
          <btn class="btn">Check video</btn>`;
      } else {
        const newProducts = filterProducts
          .map((product) => {
            const { id: id2, image } = product;
            return `<a href="product.html?id=${id2}">
            <img src="${image}" class="available-image-sale">
            </a>`;
          })
          .join('');
        container.innerHTML = `<div class="available-sales"><div class="available-container-info"><h4>Pick your poison</h4><p>These products are on sale and should be bought</p></div><div class="available-container-sale ">${newProducts}</div><div class="div-class"><a href="shop.html" class="btn shop-btn">Shop</a></div></div>`;
      }
    });
  });
};

const displayAvailableProduct = () => {
  const productsCenter = getElement('.products-center');

  productsCenter.innerHTML = availableProducts
    .map((product) => {
      const { id, image, text, title } = product;
      return `
          <div class="product">
          <a href="Product_index.html?id=${id}" class="text-none">
            <img src="${image}" 
            class="product-pic">
            <div class="product-info">
              <h3>${title}</h3>
              <p>${text}.</p>
            </div>
            </a>
          </div>
          `;
    })
    .join('');
};

export { displayAvailableProduct, displayProductAvailable };
