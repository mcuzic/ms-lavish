import getElement from './Get Element.js';
import products from './products.js';

const featureCenter = getElement('.feature-product-center');
const featuredImg = getElement('.f-image');
const countdownText = getElement('.countdown-product-text');
const btnContainer = getElement('.products-sale');

const displayProduct = (array) => {
  const filterFeatured = array.filter((product) => {
    if (product.featured === true) {
      return product;
    }
  });

  featuredImg.src = filterFeatured[0].image;
  countdownText.textContent = filterFeatured[0].text;
  btnContainer.innerHTML = filterFeatured
    .map((item, index) => {
      //set active for the first button
      let active = 'active';
      if (index === 0) {
        active = 'active';
      } else {
        active = 'none';
      }
      return `
            <div class="products-sale-product ">
              <btn class ="featured-product-title" data-index="${item.title}">${item.title}</btn>
              <div class="sale-line ${active}"></div>
            </div>`;
    })
    .join('');

  const btns = btnContainer.querySelectorAll('.featured-product-title');
  const saleLines = btnContainer.querySelectorAll('.sale-line');
  //add eventListner for button and sale-line
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      saleLines.forEach((saleLine) => {
        saleLine.classList.remove('active');
      });
      const sLine = e.currentTarget.nextElementSibling;
      const index = e.currentTarget.dataset.index;
      sLine.classList.add('active');
      const newProduct = filterFeatured.filter((product) => {
        if (index === product.title) {
          return product;
        }
      });
      featuredImg.src = newProduct[0].image;
      countdownText.textContent = newProduct[0].text;
    });
  });
};

export default displayProduct;
