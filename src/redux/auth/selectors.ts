import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@redux/reducers';

const authSelector = (state: RootState) => state.auth;

const userLogin = createSelector(authSelector, authState => authState.user);
const loginLoading = createSelector(authSelector, authState => authState.loading);

export { userLogin, loginLoading };
