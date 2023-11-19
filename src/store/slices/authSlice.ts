import { createSlice } from '@reduxjs/toolkit';
import { IAuthResponse } from '../../common/types';

const initialState = {
  user: {} as IAuthResponse,
  isLogged: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLogged = true;
      // console.log(action.payload);
    },
    logout(state) {
      state.user = {} as IAuthResponse;
      state.isLogged = false;
    },
    register(state, action) {
      state.user = action.payload;
      state.isLogged = true;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
