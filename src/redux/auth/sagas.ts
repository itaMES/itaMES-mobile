import { PayloadAction } from '@reduxjs/toolkit';
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { loginSuccess, loginRequest, logoutRequest, logoutSuccess } from './actions';
import { loginServices, logoutServices } from '@redux/auth/services';
import { LoginRequestPayload, ILoginSuccessResponse } from './types';

// Login
function* loginSaga({ payload }: PayloadAction<ILoginSuccessResponse>): Generator<
  | CallEffect
  | PutEffect<{
      payload: LoginRequestPayload;
      type: string;
    }>,
  void
> {
  try {
    const response = yield call(loginServices.login, payload);
    const { ok = false, data } = response as ILoginSuccessResponse;
    if (ok) {
      const { token = '' } = data;
      try {
        AsyncStorage.setItem('@token', token);
      } catch (e) {
        // saving error
      }
      yield put(loginSuccess(data));
    }
    // if (!isEmpty(filmsRes)) {
    //   yield put(getAllFilmsSuccess(filmsRes));
    // } else {
    //   yield put(getAllFilmsFailed());
    // }
  } catch (err) {
    // yield put(getAllFilmsFailed());
  }
}

function* loginG(): Generator<ForkEffect<never>, void> {
  yield takeLatest(loginRequest.type, loginSaga);
}

// Logout
function* logoutSaga({ payload }: PayloadAction<ILoginSuccessResponse>): Generator<
  | CallEffect
  | PutEffect<{
      payload: LoginRequestPayload;
      type: string;
    }>,
  void
> {
  try {
    const response = yield call(logoutServices.logout);

    const { ok = false, data } = response as ILoginSuccessResponse;
    if (ok) {
      try {
        AsyncStorage.removeItem('@token');
      } catch (e) {
        // saving error
      }
      yield put(logoutSuccess());
    }
    // if (!isEmpty(filmsRes)) {
    //   yield put(getAllFilmsSuccess(filmsRes));
    // } else {
    //   yield put(getAllFilmsFailed());
    // }
  } catch (err) {
    // yield put(getAllFilmsFailed());
  }
}

function* logoutG(): Generator<ForkEffect<never>, void> {
  yield takeLatest(logoutRequest.type, logoutSaga);
}
const authSaga = [loginG, logoutG];

export default authSaga;
