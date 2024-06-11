import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configs/storeConfig';
import { Currency, CurrencySign } from '../../shared/types/currency';

interface CurrencyState {
  currency: Currency;
  currencySign: CurrencySign;
  rate: {
    [Currency.euro]: number;
    [Currency.pound]: number;
    [Currency.dollar]: 1;
  };
}

const initialState: CurrencyState = {
  currency: Currency.euro,
  currencySign: CurrencySign.euro,
  rate: {
    [Currency.euro]: 1,
    [Currency.pound]: 1,
    [Currency.dollar]: 1,
  },
};

export const currencySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
      state.currencySign = CurrencySign[action.payload];
    },
    setRates: (state, action) => {
      state.rate[Currency.euro] = action.payload.data.EUR.value;
      state.rate[Currency.pound] = action.payload.data.GBP.value;
    },
  },
});

export const { setCurrency, setRates } = currencySlice.actions;

export const selectCounty = (state: RootState) => state.currency.currency;

export default currencySlice.reducer;
