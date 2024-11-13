import products from './utilitis/products.js';
import getElement from './utilitis/Get Element.js';
import { navigation } from './utilitis/shared.js';
import { note } from './utilitis/shared.js';

navigation();

const singleContainer = getElement('.single-product-container');
const singleImg = getElement('.single-product-img');
const singleTitle = getElement('.single-product-title');
const singleBrand = getElement('.single-product-brand');
const singlePrice = getElement('.single-price');
const singleText = getElement('.single-product-text');
const newForm = getElement('.new-form');
const closeBtn = getElement('.close-btn-form');
const formBtn = getElement('.form-btn');
const thxNote = document.querySelector('.thank-you');

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
  singleContainer.classList.add('single-product-shop-hero');
  singleContainer.innerHTML = `<div class="single-img-container ">
          <img
            src="${image}"
            alt=""
            class="single-product-img"
          />
        </div>
        <div class="single-product-info">
          <h3 class="single-product-title">${title}</h3>
          <h4 class="single-product-brand">${product}</h4>
          <p class="single-price">€${displayPrice}</p>
          <p class="single-product-text">
           ${text}
          </p>
          <div class="enquiry-info">
            <button class="btn enquiry">Send enquiry</button>
          </div>
        </div>`;
};
displayProduct(filteredProducts);

const formFunction = (array) => {
  const enquiry = singleContainer.querySelector('.enquiry');
  const product = getElement('.product-field');
  const productImg = getElement('.message-img');
  let ariaRequired;

  enquiry.addEventListener('click', () => {
    newForm.classList.add('form-display');
    product.value = array[0].title;
    productImg.src = array[0].image;
    newForm.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
  formBtn.addEventListener('click', () => {
    const fields = document.querySelectorAll('.field');
    let allFieldsPopulated = true;
    fields.forEach((field, index) => {
      if (field.value === '' && field.hasAttribute('required')) {
        field.style.border = '1px red solid';
        allFieldsPopulated = false;
        return;
      }
    });
    if (allFieldsPopulated) {
      fields.forEach((field) => {
        ariaRequired = field.hasAttribute('required');
        field.value = '';
        if (!ariaRequired) {
          field.style.border = '1px black solid';
        } else {
          field.style.border = 'none';
        }
      });
      //Thank you note
      thxNote.style.display = 'block';
      //hide message
      note(thxNote, newForm, 'form-display');
    }
  });
  closeBtn.addEventListener('click', () => {
    newForm.classList.remove('form-display');
  });
};

formFunction(filteredProducts);
