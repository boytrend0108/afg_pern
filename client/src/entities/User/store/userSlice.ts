import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../types';
import { register, login, logout, update, checkAuth } from './thunks';
import { handleResponce } from './handleResponse';

const initialState: UserState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, handleResponce.register);
    builder.addCase(register.fulfilled, handleResponce.register);
    builder.addCase(register.rejected, handleResponce.register);

    builder.addCase(login.pending, handleResponce.login);
    builder.addCase(login.fulfilled, handleResponce.login);
    builder.addCase(login.rejected, handleResponce.login);

    builder.addCase(logout.pending, handleResponce.logout);
    builder.addCase(logout.fulfilled, handleResponce.logout);
    builder.addCase(logout.rejected, handleResponce.logout);

    builder.addCase(update.pending, handleResponce.update);
    builder.addCase(update.fulfilled, handleResponce.update);
    builder.addCase(update.rejected, handleResponce.update);

    builder.addCase(checkAuth.pending, handleResponce.checkAuth);
    builder.addCase(checkAuth.fulfilled, handleResponce.checkAuth);
    builder.addCase(checkAuth.rejected, handleResponce.checkAuth);
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
