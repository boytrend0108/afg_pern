import { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';
import {
  LOGIN_PREFIX,
  REGISTER_PREFIX,
  LOGOUT_PREFIX,
  UPDATE_PREFIX,
  CHECK_AUTH_PREFIX,
} from './consts';

export const handleResponce = {
  register(state: UserState, action: PayloadAction<any | any>) {
    switch (action.type) {
      case REGISTER_PREFIX.pending:
        state.loading = true;
        state.error = null;
        break;

      case REGISTER_PREFIX.fulfilled:
        state.loading = false;
        break;

      case REGISTER_PREFIX.rejected:
        state.loading = false;
        state.error = action.payload;
        break;
    }
  },

  login(state: UserState, action: PayloadAction<any | any>) {
    switch (action.type) {
      case LOGIN_PREFIX.pending:
        state.loading = true;
        state.error = null;
        break;

      case LOGIN_PREFIX.fulfilled:
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        break;

      case LOGIN_PREFIX.rejected:
        state.loading = false;
        state.error = action.payload.message;
        break;
    }
  },

  logout(state: UserState, action: PayloadAction<any | any>) {
    switch (action.type) {
      case LOGOUT_PREFIX.pending:
        state.loading = true;
        state.error = null;
        break;

      case LOGOUT_PREFIX.fulfilled:
        state.loading = false;
        state.user = null;
        break;

      case LOGOUT_PREFIX.rejected:
        state.loading = false;
        state.error = action.payload.message;
        break;
    }
  },

  update(state: UserState, action: PayloadAction<any | any>) {
    switch (action.type) {
      case UPDATE_PREFIX.pending:
        state.loading = true;
        state.error = null;
        break;

      case UPDATE_PREFIX.fulfilled:
        state.loading = false;
        state.user = action.payload;
        break;

      case UPDATE_PREFIX.rejected:
        state.loading = false;
        state.error = action.payload;
        break;
    }
  },

  checkAuth(state: UserState, action: PayloadAction<any | any>) {
    switch (action.type) {
      case CHECK_AUTH_PREFIX.pending:
        state.loading = true;
        state.error = null;
        break;

      case CHECK_AUTH_PREFIX.fulfilled:
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        break;

      case CHECK_AUTH_PREFIX.rejected:
        state.loading = false;
        state.error = action.payload;
        break;
    }
  },
};
