import products from '../utilitis/products.js';
import { navigation } from '../utilitis/shared.js';
import countdown from '../utilitis/Countdown.js';
import displayProducts from '../utilitis/displayProduct.js';
import { displayAvailableProduct } from '../utilitis/product_features.js';
import { submenu } from '../utilitis/shared.js';

navigation();

submenu();

displayProducts(products);
countdown();
displayAvailableProduct();
