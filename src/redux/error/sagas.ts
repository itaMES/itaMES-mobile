import { CallEffect, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { removeError, removeErrorRequest } from './actions';

// Remove error
function* removeErrorSaga(): Generator<
  | CallEffect
  | PutEffect<{
      type: string;
    }>,
  void
> {
  try {
    yield put(removeError());
  } catch (err) {
    // yield put(getAllFilmsFailed());
  }
}

function* errorG(): Generator<ForkEffect<never>, void> {
  yield takeLatest(removeErrorRequest.type, removeErrorSaga);
}

const globalModalSaga = [errorG];

export default globalModalSaga;
