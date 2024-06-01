import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../types';
import { getOne, getAll } from './thunks';
import { handleResponce } from './handleResponse';

const initialState: ProductState = {
  product: null,
  products: [],
  count: 0,
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

    builder.addCase(getAll.pending, handleResponce.getAll);
    builder.addCase(getAll.fulfilled, handleResponce.getAll);
    builder.addCase(getAll.rejected, handleResponce.getAll);
  },
});

// export const {  } = productSlice.actions;

export default productSlice.reducer;
