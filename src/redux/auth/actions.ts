import { createAction } from '@reduxjs/toolkit';
import { LoginData, LoginRequestPayload } from './types';

const loginRequest = createAction<LoginRequestPayload>('LOGIN_REQUEST');
const loginSuccess = createAction<LoginData>('LOGIN_SUCCESS');
// export const getAllFilmsFailed = createAction('GET_ALL_FILMS_FAILED');

export { loginRequest, loginSuccess };
