import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../types';
import { getOne, getAll } from './thunks';
import { handleResponce } from './handleResponse';

const initialState: ProductState = {
  product: null,
  products: [],
  compare: [],
  favorite: [],
  booked: null,
  count: 0,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      if (state.compare.length !== 1) {
        state.compare.push(action.payload);
      } else {
        state.compare[1] = action.payload;
      }
    },
    removeFromCompare: (state, action) => {
      state.compare = state.compare.filter((el) => el.id !== action.payload);
    },
    clearCompare: (state) => {
      state.compare = [];
    },
    addFavorite: (state, action) => {
      state.favorite = action.payload || [];
    },
    setBooked: (state, action) => {
      state.booked = action.payload;
    },
    removeBooked: (state) => {
      state.booked = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOne.pending, handleResponce.getOne);
    builder.addCase(getOne.fulfilled, handleResponce.getOne);
    builder.addCase(getOne.rejected, handleResponce.getOne);

    builder.addCase(getAll.pending, handleResponce.getAll);
    builder.addCase(getAll.fulfilled, handleResponce.getAll);
    builder.addCase(getAll.rejected, handleResponce.getAll);
  },
});

export const {
  addToCompare,
  removeFromCompare,
  clearCompare,
  addFavorite,
  setBooked,
  removeBooked,
} = productSlice.actions;

export default productSlice.reducer;
