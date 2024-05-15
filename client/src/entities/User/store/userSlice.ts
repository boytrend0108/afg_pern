import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

interface UserState {
  user: User | null;
  accessToken: string;
  loading: boolean;
  error: '';
}

const initialState: UserState = {
  user: null,
  accessToken: '',
  loading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const { } = userSlice.actions;

export default userSlice.reducer;
