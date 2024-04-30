import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configs/storeConfig';
import { Currency } from '../../shared/types/currency';

interface CurrencyState {
  currency: Currency;
}

const initialState: CurrencyState = {
  currency: Currency.euro,
};

export const currencySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export const selectCounty = (state: RootState) => state.currency.currency;

export default currencySlice.reducer;
