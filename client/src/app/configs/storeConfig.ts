import { configureStore } from '@reduxjs/toolkit';
import countryReduser from '../store/countryReducer';
import currencyReduser from '../store/currencyReducer';
import { user } from '../../entities/User';
import { productReducer } from '../../entities/ProductItem';

export const store = configureStore({
  reducer: {
    country: countryReduser,
    currency: currencyReduser,
    user: user.userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
