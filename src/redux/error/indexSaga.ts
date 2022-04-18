import { all, AllEffect, call, ForkEffect, spawn } from 'redux-saga/effects';
import globalSaga from './sagas';

function* globalModalRootSaga(): Generator<AllEffect<ForkEffect<void>>, void> {
  yield all(
    globalSaga.map(saga =>
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

export default globalModalRootSaga;
