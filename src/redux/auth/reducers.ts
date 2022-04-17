import { createReducer } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, logoutSuccess } from './actions';
import { LoginData } from './types';

export interface IAuthState {
  loading: boolean;
  user: LoginData;
}

const initialState: IAuthState = {
  loading: false,
  user: {},
};

export const authReducer = createReducer(initialState, {
  [loginRequest.type]: state => {
    state.loading = true;
    state.user = {};
  },
  [loginSuccess.type]: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  [logoutSuccess.type]: (state, action) => {
    state.user = {};
  },
  // [getAllFilmsFailed.type]: state => {
  //   state.loading = false;
  // },
});
