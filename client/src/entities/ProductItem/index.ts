import { ProductItem } from './ui/ProductItem';
import { productAPI } from './api';
import productReducer from './store/productSlice';
import * as productAction from './store/productSlice';
import { getOne, getAll } from './store/thunks';

export {
  ProductItem,
  productAPI,
  productReducer,
  getOne,
  getAll,
  productAction,
};
