import products from '../utilitis/products.js';
import { navigation } from '../utilitis/shared.js';
import countdown from '../utilitis/Countdown.js';

import displayProducts from '../utilitis/displayProduct.js';

navigation();

displayProducts(products);
countdown();
