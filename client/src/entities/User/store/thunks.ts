import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { userAPI } from '../api';
import {
  LOGIN_PREFIX,
  LOGOUT_PREFIX,
  REGISTER_PREFIX,
  UPDATE_PREFIX,
} from './consts';
import { DtoRegistration } from '../../../widgets/Forms/RegistrationForm';
import { DtoLogin } from '../../../widgets/Forms/LoginForm/types/DtoLogin';
import localStorageService from '../../../shared/services/localStorageService';
import { UserUpdateType } from '../types';

export const register = createAsyncThunk(
  REGISTER_PREFIX.base,
  async (dto: DtoRegistration, { rejectWithValue }) => {
    try {
      return await userAPI.register(dto);
    } catch (err) {
      return rejectWithValue({
        message: (err as AxiosError).response?.data,
      });
    }
  },
);

export const login = createAsyncThunk(
  LOGIN_PREFIX.base,
  async (dto: DtoLogin, { rejectWithValue }) => {
    try {
      const response = await userAPI.login(dto);

      localStorageService.set('user', response.user);
      localStorageService.set('accessToken', response.accessToken);

      return response;
    } catch (err) {
      return rejectWithValue({
        message: (err as AxiosError).response?.data,
      });
    }
  },
);

export const logout = createAsyncThunk(
  LOGOUT_PREFIX.base,
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.logout();

      localStorageService.remove('user');

      return response;
    } catch (err) {
      return rejectWithValue({
        message: (err as AxiosError).response?.data,
      });
    }
  },
);

export const update = createAsyncThunk(
  UPDATE_PREFIX.base,
  async (dto: UserUpdateType, { rejectWithValue }) => {
    try {
      const response = await userAPI.update(dto);

      if (response) {
        localStorageService.set('user', response);
      }

      return response;
    } catch (err) {
      return rejectWithValue({
        message: (err as AxiosError).response?.data,
      });
    }
  },
);
