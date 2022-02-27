import { PayloadAction } from '@reduxjs/toolkit';
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { loginSuccess, loginRequest } from './actions';
import { loginServices } from '@redux/auth/services';
import { LoginRequestPayload, ILoginSuccessResponse } from './types';

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

const authSaga = [loginG];

export default authSaga;
