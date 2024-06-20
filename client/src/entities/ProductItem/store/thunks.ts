import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { productAPI } from '../api';
import { GET_ALL_PREFIX, GET_ONE_PREFIX } from './consts';

export const getOne = createAsyncThunk(
  GET_ONE_PREFIX.base,
  async (id: string, { rejectWithValue }) => {
    try {
      return await productAPI.getProductById(id);
    } catch (err) {
      return rejectWithValue({
        message: (err as AxiosError).response?.data,
      });
    }
  },
);

export const getAll = createAsyncThunk(
  GET_ALL_PREFIX.base,
  async (params: URLSearchParams, { rejectWithValue }) => {
    try {
      return await productAPI.getAll(params);
    } catch (err) {
      return rejectWithValue({
        message: (err as AxiosError).response?.data,
      });
    }
  },
);
