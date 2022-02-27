import { all, AllEffect, call, ForkEffect, spawn } from 'redux-saga/effects';
import authSaga from '@redux/auth/sagas';

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>> {
  const sagas = [...authSaga];

  yield all(
    sagas.map(saga =>
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

export default rootSaga;
