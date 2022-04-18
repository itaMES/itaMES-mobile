import { all, AllEffect, call, ForkEffect, spawn } from 'redux-saga/effects';
import authSaga from '@redux/auth/sagas';
import errorSaga from '@redux/error/sagas';

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>> {
  const sagas = [...authSaga, ...errorSaga];

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
