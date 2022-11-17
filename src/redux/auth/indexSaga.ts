import { all, AllEffect, call, ForkEffect, spawn } from 'redux-saga/effects';
import authSaga from './sagas';

function* authRootSaga(): Generator<AllEffect<ForkEffect<void>>, void> {
  yield all(
    authSaga.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      }),
    ),
  );
}

export default authRootSaga;
