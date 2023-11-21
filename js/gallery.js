import { navigation } from '../utilitis/shared.js';
import getElement from '../utilitis/Get Element.js';
import photos from '../utilitis/galleryPhotos.js';
navigation();

const section = getElement('.section-center-gallery');
const btnContainer = getElement('.btn-container');

const unique = [...new Set(photos.map((photo) => photo.product))];

const itemsPerPage = 15;
const numberOfPages = Math.ceil(photos.length / itemsPerPage);
const newImages = Array.from({ length: numberOfPages }, (_, index) => {
  const start = index * itemsPerPage;
  return photos.slice(start, start + itemsPerPage);
});

btnContainer.innerHTML = newImages
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

const uniqueProduct = (array, index) => {
  const uniqueSection = unique
    .map((uni) => {
      const images = array[index].filter((img) => {
        if (img.product === uni) {
          return img;
        }
      });
      const photosHTML = images
        .map((img) => {
          return `<img
              src="${img.src}"
              title="${img.title}"
              id="${img.id}"
              class="project-pic"
              alt="${img.title}"
            />`;
        })
        .join('');
      return `<section class="section gallery ${uni}">
  ${photosHTML}
  
          </section>`;
    })
    .join('');
  return uniqueSection;
};

section.innerHTML = uniqueProduct(newImages, 0);

const btns = document.querySelectorAll('.btn-pagination');
btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btns.forEach((btn) => {
      btn.classList.remove('selected');
    });
    btn.classList.add('selected');
    section.innerHTML = uniqueProduct(newImages, index);
    initializeGallery();
  });
});

function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll('.project-pic')];
  this.modal = getElement('.modal');
  this.nextBtn = getElement('.next-btn-modal');
  this.prevBtn = getElement('.prev-btn-modal');
  this.mainImg = getElement('.main-img');
  this.imgName = getElement('.image-name');
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn-modal');
  //bind modal
  this.closeModal = this.closeModal.bind(this);
  this.nextImg = this.nextImg.bind(this);
  this.prevImg = this.prevImg.bind(this);
  this.chooseImage = this.chooseImage.bind(this);

  this.container.addEventListener(
    'click',
    function (e) {
      console.log('hej');
      if (e.target.classList.contains('project-pic')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, lists) {
  console.log(this);
  this.setMainImg(selectedImage);
  this.modalImages.innerHTML = lists
    .map((item) => {
      return `<img
              src="${item.src}"
              title="${item.title}"
              id="${item.id}"
              class="${
                selectedImage.id === item.id
                  ? 'modal-img selected'
                  : 'modal-img'
              }"
              alt="${item.title}"
            />`;
    })
    .join('');
  this.modal.classList.add('open');
  this.closeBtn.addEventListener('click', this.closeModal);
  this.nextBtn.addEventListener('click', this.nextImg);
  this.prevBtn.addEventListener('click', this.prevImg);
  this.modalImages.addEventListener('click', this.chooseImage);
};
Gallery.prototype.setMainImg = function (selectedImage) {
  this.mainImg.src = selectedImage.src;
  this.imgName.textContent = selectedImage.title;
};
Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal);
  this.nextBtn.removeEventListener('click', this.nextImg);
  this.prevBtn.removeEventListener('click', this.prevImg);
  this.modalImages.removeEventListener('click', this.chooseImage);
};
Gallery.prototype.nextImg = function () {
  const selectedImg = this.modalImages.querySelector('.selected');
  selectedImg.classList.remove('selected');
  const next =
    selectedImg.nextElementSibling || this.modalImages.firstElementChild;
  next.classList.add('selected');
  this.setMainImg(next);
};
Gallery.prototype.prevImg = function () {
  const selectedImg = this.modalImages.querySelector('.selected');
  selectedImg.classList.remove('selected');
  const prev =
    selectedImg.previousElementSibling || this.modalImages.lastElementChild;
  prev.classList.add('selected');
  this.setMainImg(prev);
};
Gallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');
    this.setMainImg(e.target);
    e.target.classList.add('selected');
  }
};

function initializeGallery() {
  const galleries = document.querySelectorAll('.gallery');
  galleries.forEach((gallery) => {
    new Gallery(gallery);
  });
}

const toteBag = new Gallery(getElement('.tote-bag'));
const wreath = new Gallery(getElement('.wreath'));
const paintings = new Gallery(getElement('.paintings'));
