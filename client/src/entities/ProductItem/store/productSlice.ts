import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../types';
import { getOne } from './thunks';
import { handleResponce } from './handleResponse';

const initialState: ProductState = {
  product: null,
  products: [],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOne.pending, handleResponce.getOne);
    builder.addCase(getOne.fulfilled, handleResponce.getOne);
    builder.addCase(getOne.rejected, handleResponce.getOne);
  },
});

// export const {  } = productSlice.actions;

export default productSlice.reducer;
