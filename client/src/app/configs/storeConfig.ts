import { configureStore } from '@reduxjs/toolkit';
import countryReduser from '../store/countryReducer';
import currencyReduser from '../store/currencyReducer';

export const store = configureStore({
  reducer: {
    country: countryReduser,
    currency: currencyReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
