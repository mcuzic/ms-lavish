import products from '../utilitis/products.js';
import { navigation } from '../utilitis/shared.js';

import {
  displayProducts,
  displayButtons,
  search,
} from '../utilitis/shopFeatures.js';

// products

displayProducts(products);
displayButtons(products);
search(products);
navigation();
