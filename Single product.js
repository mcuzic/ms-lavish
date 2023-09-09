import products from './utilitis/products.js';
import getElement from './utilitis/Get Element.js';

const singleContainer = getElement('.single-product-container');
const singleImg = getElement('.single-product-img');
const singleTitle = getElement('.single-product-title');
const singleBrand = getElement('.single-product-brand');
const singlePrice = getElement('.single-price');
const singleText = getElement('.single-product-text');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const filteredProducts = products.filter((product) => {
  if (id === product.id) {
    return product;
  }
});

const displayProduct = (array) => {
  const { id, image, price, product, text, title, featuredPrice, featured } =
    array[0];
  let displayPrice = price;
  if (featured) {
    displayPrice = featuredPrice;
  }
  singleContainer.innerHTML = `<div class="single-img-container">
          <img
            src="${image}"
            alt=""
            class="single-product-img"
          />
        </div>
        <div class="single-product-info">
          <h3 class="single-product-title">${title}</h3>
          <h4 class="single-product-brand">${product}</h4>
          <p class="single-price">$${displayPrice}</p>
          <p class="single-product-text">
           ${text}
          </p>
          <div class="enquiry-info">
            <button class="btn enquiry">Send enquiry</button>
          </div>
        </div>`;
};

displayProduct(filteredProducts);
