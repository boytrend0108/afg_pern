import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configs/storeConfig';
import { Country } from '../../shared/types/country';

interface CountryState {
  country: Country;
}

const initialState: CountryState = {
  country: Country.england,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<Country>) => {
      state.country = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;

export const selectCounty = (state: RootState) => state.country.country;

export default countrySlice.reducer;
