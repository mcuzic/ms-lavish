import products from '../utilitis/products.js';
import { navigation } from '../utilitis/shared.js';
import { submenu } from '../utilitis/shared.js';
import { pagination } from '../utilitis/shared.js';

import {
  displayProducts,
  displayButtons,
  search,
} from '../utilitis/shopFeatures.js';

// products

displayProducts(pagination(products), 0);
displayButtons(products);
search(products);
navigation();
submenu();
