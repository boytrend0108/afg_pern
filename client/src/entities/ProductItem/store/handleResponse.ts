import { PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from '../types';
import { GET_ALL_PREFIX, GET_ONE_PREFIX } from './consts';

export const handleResponce = {
  getOne(state: ProductState, action: PayloadAction<any | any>) {
    switch (action.type) {
      case GET_ONE_PREFIX.pending:
        state.loading = true;
        state.error = null;
        break;

      case GET_ONE_PREFIX.fulfilled:
        state.loading = false;
        state.product = action.payload;
        break;

      case GET_ONE_PREFIX.rejected:
        state.loading = false;
        state.error = action.payload;
        break;
    }
  },

  getAll(state: ProductState, action: PayloadAction<any | any>) {
    switch (action.type) {
      case GET_ALL_PREFIX.pending:
        state.loading = true;
        state.error = null;
        break;

      case GET_ALL_PREFIX.fulfilled:
        state.loading = false;
        state.products = action.payload.products;
        state.count = action.payload.count;
        break;

      case GET_ALL_PREFIX.rejected:
        state.loading = false;
        state.error = action.payload;
        break;
    }
  },
};
